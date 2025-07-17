import { defineEventHandler, readBody, createError } from 'h3'
import type { AuthTokens } from '../../../types/auth'
import { UserService } from '../../services/user'
import { AuthUtils } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    })
  }

  try {
    const body = await readBody<{ refreshToken: string }>(event)

    if (!body.refreshToken) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Refresh token is required',
      })
    }

    // Vérifier que le refresh token est valide et stocké
    if (!(await UserService.isValidRefreshToken(body.refreshToken))) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid refresh token',
      })
    }

    // Vérifier le refresh token
    const payload = AuthUtils.verifyRefreshToken(body.refreshToken)
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired refresh token',
      })
    }

    // Get the user
    const user = await UserService.findUserById(payload.userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    // Supprimer l'ancien refresh token
    await UserService.removeRefreshToken(body.refreshToken)

    // Générer de nouveaux tokens
    const newAccessToken = AuthUtils.generateAccessToken(user)
    const newRefreshToken = AuthUtils.generateRefreshToken(user)

    // Stocker le nouveau refresh token
    await UserService.addRefreshToken(newRefreshToken)

    const response: AuthTokens = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }

    return response
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    console.error('Refresh token error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
