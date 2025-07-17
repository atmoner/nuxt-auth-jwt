<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Navigation Header -->
    <nav class="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Brand -->
          <div class="flex items-center">
            <NuxtLink
              to="/"
              class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              🔐 AuthJWT Demo
            </NuxtLink>
          </div>

          <!-- User info or auth buttons -->
          <div class="flex items-center space-x-4">
            <div
              v-if="auth.isAuthenticated"
              class="flex items-center space-x-4"
            >
              <div class="hidden sm:flex items-center space-x-2">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-semibold">
                    {{ auth.currentUser?.username?.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <span class="text-gray-700 font-medium">{{ auth.currentUser?.username }}</span>
              </div>
              <button
                class="bg-red-600 hover:bg-red-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
                @click="handleLogout"
              >
                Logout
              </button>
            </div>
            <div
              v-else
              class="flex items-center space-x-3"
            >
              <NuxtLink
                to="/login"
                class="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Login
              </NuxtLink>
              <NuxtLink
                to="/register"
                class="bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
              >
                Sign Up
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white/50 backdrop-blur-sm border-t border-gray-200/50 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center text-gray-600">
          <p class="text-sm">
            © 2025 AuthJWT Demo - JWT Authentication Module for Nuxt 3
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const auth = useAuth()

const handleLogout = async () => {
  try {
    await auth.logout()
    await navigateTo('/')
  }
  catch (error) {
    console.error('Logout error:', error)
  }
}
</script>
