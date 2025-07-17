import { defineEventHandler, readBody, createError } from 'h3'
import type { LoginCredentials, AuthResponse } from '../../../types/auth'
import { verifyCredentials, addRefreshToken } from '../../services/user'
import { generateAccessToken, generateRefreshToken } from '../../utils/auth'

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
    const user = await verifyCredentials(body.email, body.password)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials',
      })
    }

    // Générer les tokens
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    // Stocker le refresh token
    await addRefreshToken(refreshToken)

    const response: AuthResponse = {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    }

    return response
  }
  catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('Login error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
