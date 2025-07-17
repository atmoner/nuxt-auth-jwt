import { defineEventHandler, readBody, createError } from 'h3'
import type { LoginCredentials, AuthResponse } from '../../../types/auth'
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
    const body = await readBody<LoginCredentials>(event)

    // Validation des données d'entrée
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      })
    }

    // Vérifier les identifiants
    const user = await UserService.verifyCredentials(body.email, body.password)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials',
      })
    }

    // Générer les tokens
    const accessToken = AuthUtils.generateAccessToken(user)
    const refreshToken = AuthUtils.generateRefreshToken(user)

    // Stocker le refresh token
    await UserService.addRefreshToken(refreshToken)

    const response: AuthResponse = {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    }

    return response
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    console.error('Login error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
