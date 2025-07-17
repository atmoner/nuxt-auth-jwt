import { defineNuxtModule, addPlugin, addServerHandler, createResolver, addImports } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  jwtSecret?: string
  jwtExpiresIn?: string
  jwtRefreshExpiresIn?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-auth-jwt',
    configKey: 'authJwt',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    jwtSecret: 'your-super-secret-jwt-key-change-this-in-production',
    jwtExpiresIn: '7d',
    jwtRefreshExpiresIn: '30d',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Ajouter les variables d'environnement
    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || {}
    nuxt.options.runtimeConfig.private = nuxt.options.runtimeConfig.private || {}

    if (!process.env.JWT_SECRET) {
      process.env.JWT_SECRET = options.jwtSecret
    }
    if (!process.env.JWT_EXPIRES_IN) {
      process.env.JWT_EXPIRES_IN = options.jwtExpiresIn
    }
    if (!process.env.JWT_REFRESH_EXPIRES_IN) {
      process.env.JWT_REFRESH_EXPIRES_IN = options.jwtRefreshExpiresIn
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    // Ajouter le composable useAuth
    addImports({
      name: 'useAuth',
      from: resolver.resolve('./runtime/composables/useAuth'),
    })

    // Add authentication API handlers
    addServerHandler({
      route: '/api/auth/login',
      handler: resolver.resolve('./runtime/server/api/auth/login.post'),
    })

    addServerHandler({
      route: '/api/auth/register',
      handler: resolver.resolve('./runtime/server/api/auth/register.post'),
    })

    addServerHandler({
      route: '/api/auth/profile',
      handler: resolver.resolve('./runtime/server/api/auth/profile.get'),
    })

    addServerHandler({
      route: '/api/auth/refresh',
      handler: resolver.resolve('./runtime/server/api/auth/refresh.post'),
    })

    addServerHandler({
      route: '/api/auth/logout',
      handler: resolver.resolve('./runtime/server/api/auth/logout.post'),
    })

    // Add authentication middleware
    addServerHandler({
      middleware: true,
      handler: resolver.resolve('./runtime/server/middleware/auth'),
    })

    // Ajouter un exemple d'endpoint protégé
    addServerHandler({
      route: '/api/protected/users',
      handler: resolver.resolve('./runtime/server/api/protected/users.get'),
    })
  },
})
