import { defineEventHandler, readBody, createError } from 'h3'
import type { RegisterCredentials, AuthResponse } from '../../../types/auth'
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
    const body = await readBody<RegisterCredentials>(event)

    // Validation des données d'entrée
    if (!body.email || !body.username || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email, username and password are required',
      })
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format',
      })
    }

    // Password validation
    if (body.password.length < 6) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must be at least 6 characters long',
      })
    }

    // Validation du username
    if (body.username.length < 3) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username must be at least 3 characters long',
      })
    }

    // Create the user
    const user = await UserService.createUser(body)

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

    if (error.message === 'User already exists with this email or username') {
      throw createError({
        statusCode: 409,
        statusMessage: error.message,
      })
    }

    console.error('Register error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
