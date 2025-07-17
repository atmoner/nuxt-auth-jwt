import { defineNuxtPlugin, useState, useCookie } from '#app'
import type { User, AuthTokens, LoginCredentials, RegisterCredentials } from './types/auth'

export default defineNuxtPlugin(() => {
  // Global authentication state
  const user = useState<User | null>('auth.user', () => null)
  const accessToken = useCookie<string | null>('auth.accessToken', {
    default: () => null,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  })
  const refreshToken = useCookie<string | null>('auth.refreshToken', {
    default: () => null,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 jours
  })

  // Authentication API
  const authAPI = {
    async login(credentials: LoginCredentials) {
      const data = await $fetch<{ user: User, tokens: AuthTokens }>('/api/auth/login', {
        method: 'POST',
        body: credentials,
      })

      // Mettre à jour l'état
      user.value = data.user
      accessToken.value = data.tokens.accessToken
      refreshToken.value = data.tokens.refreshToken

      return data
    },

    async register(email: string, username: string, password: string) {
      const credentials: RegisterCredentials = { email, username, password }
      const data = await $fetch<{ user: User, tokens: AuthTokens }>('/api/auth/register', {
        method: 'POST',
        body: credentials,
      })

      // Mettre à jour l'état
      user.value = data.user
      accessToken.value = data.tokens.accessToken
      refreshToken.value = data.tokens.refreshToken

      return data
    },

    async logout() {
      if (refreshToken.value) {
        try {
          await $fetch('/api/auth/logout', {
            method: 'POST',
            body: { refreshToken: refreshToken.value },
          })
        }
        catch (error) {
          console.error('Logout error:', error)
        }
      }

      // Nettoyer l'état
      user.value = null
      accessToken.value = null
      refreshToken.value = null
    },

    async refreshTokens() {
      if (!refreshToken.value) {
        throw new Error('No refresh token available')
      }

      const data = await $fetch<AuthTokens>('/api/auth/refresh', {
        method: 'POST',
        body: { refreshToken: refreshToken.value },
      })

      // Mettre à jour les tokens
      accessToken.value = data.accessToken
      refreshToken.value = data.refreshToken

      return data
    },

    async getProfile() {
      if (!accessToken.value) {
        throw new Error('No access token available')
      }

      const data = await $fetch<{ user: User }>('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      })

      user.value = data.user
      return data.user
    },

    // Helper pour faire des requêtes authentifiées
    async authenticatedFetch(url: string, options: { headers?: Record<string, string>, [key: string]: unknown } = {}) {
      if (!accessToken.value) {
        throw new Error('No access token available')
      }

      try {
        return await $fetch(url, {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${accessToken.value}`,
          },
        })
      }
      catch (error: unknown) {
        // Si le token a expiré, essayer de le rafraîchir
        if (error && typeof error === 'object' && 'status' in error && error.status === 401 && refreshToken.value) {
          try {
            await this.refreshTokens()

            // Réessayer la requête avec le nouveau token
            return await $fetch(url, {
              ...options,
              headers: {
                ...(options.headers || {}),
                Authorization: `Bearer ${accessToken.value}`,
              },
            })
          }
          catch (refreshError) {
            // If refresh fails, logout the user
            await this.logout()
            throw refreshError
          }
        }
        throw error
      }
    },

    // Getters
    get isAuthenticated() {
      return !!user.value && !!accessToken.value
    },

    get currentUser() {
      return user.value
    },
  }

  // Initialiser l'état si les tokens existent
  if (import.meta.client && accessToken.value && !user.value) {
    authAPI.getProfile().catch(() => {
      // Si l'obtention du profil échoue, nettoyer les tokens
      authAPI.logout()
    })
  }

  // Provide authentication API globally
  return {
    provide: {
      auth: authAPI,
    },
  }
})
