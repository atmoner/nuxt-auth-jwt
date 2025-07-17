import { defineEventHandler, readBody, createError } from 'h3'
import type { AuthTokens } from '../../../types/auth'
import { isValidRefreshToken, findUserById, removeRefreshToken, addRefreshToken } from '../../services/user'
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from '../../utils/auth'

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
    if (!(await isValidRefreshToken(body.refreshToken))) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid refresh token',
      })
    }

    // Vérifier le refresh token
    const payload = verifyRefreshToken(body.refreshToken)
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired refresh token',
      })
    }

    // Get the user
    const user = await findUserById(payload.userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    // Supprimer l'ancien refresh token
    await removeRefreshToken(body.refreshToken)

    // Generate new tokens
    const newAccessToken = generateAccessToken(user)
    const newRefreshToken = generateRefreshToken(user)

    // Store new refresh token
    await addRefreshToken(newRefreshToken)

    const response: AuthTokens = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }

    return response
  }
  catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('Refresh token error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
