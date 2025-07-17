import { defineEventHandler, getHeader, createError } from 'h3'
import { AuthUtils } from '../utils/auth'
import { UserService } from '../services/user'

export default defineEventHandler(async (event) => {
  // Appliquer seulement aux routes protégées (commence par /api/protected/)
  if (!event.path?.startsWith('/api/protected/')) {
    return
  }

  try {
    // Extraire le token de l'en-tête Authorization
    const authHeader = getHeader(event, 'authorization')
    const token = AuthUtils.extractTokenFromHeader(authHeader)

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authorization token required',
      })
    }

    // Vérifier le token
    const payload = AuthUtils.verifyToken(token)
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired token',
      })
    }

    // Verify that the user still exists
    const user = await UserService.findUserById(payload.userId)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found',
      })
    }

    // Add user information to request context
    event.context.user = user
    event.context.userId = user.id
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    console.error('Auth middleware error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
