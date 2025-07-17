export default defineNuxtConfig({
  app: {
    baseURL: '/nuxt-auth-jwt/',
  },
  modules: ['../src/module', '@nuxt/ui'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  authJwt: {
    jwtSecret: 'my-super-secret-key-for-development',
    jwtExpiresIn: '1h',
    jwtRefreshExpiresIn: '7d',
  },
})
