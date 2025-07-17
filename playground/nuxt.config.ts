export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  devtools: { enabled: true },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://atmoner.github.io/nuxt-auth-jwt/' : 'https://atmoner.github.io/nuxt-auth-jwt/',
  },
  css: ['~/assets/css/main.css'],
  authJwt: {
    jwtSecret: 'my-super-secret-key-for-development',
    jwtExpiresIn: '1h',
    jwtRefreshExpiresIn: '7d',
  },
})
