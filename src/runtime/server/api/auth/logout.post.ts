import { defineEventHandler, readBody, createError } from 'h3'
import { removeRefreshToken } from '../../services/user'

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

    // Supprimer le refresh token du stockage
    await removeRefreshToken(body.refreshToken)

    return { message: 'Logged out successfully' }
  }
  catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('Logout error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
