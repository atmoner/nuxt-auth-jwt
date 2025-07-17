<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-slide-up">
        Welcome to JWT Demo
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Discover our secure and modern JWT authentication module for Nuxt 3
      </p>
    </div>

    <!-- Authenticated User Section -->
    <div
      v-if="auth.isAuthenticated"
      class="space-y-8"
    >
      <!-- User Profile Card -->
      <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto animate-slide-up">
        <div class="flex items-center space-x-4 mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <span class="text-white text-2xl font-bold">
              {{ auth.currentUser?.username?.charAt(0).toUpperCase() }}
            </span>
          </div>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">
              User Profile
            </h2>
            <p class="text-gray-600">
              Welcome, {{ auth.currentUser?.username }}!
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z"
                  />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">
                  User ID
                </p>
                <p class="text-gray-600">
                  {{ auth.currentUser?.id }}
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">
                  Email
                </p>
                <p class="text-gray-600">
                  {{ auth.currentUser?.email }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">
                  Username
                </p>
                <p class="text-gray-600">
                  {{ auth.currentUser?.username }}
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8"
                  />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">
                  Member since
                </p>
                <p class="text-gray-600">
                  {{ formatDate(auth.currentUser?.createdAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions Section -->
      <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
        <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
          Available Actions
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            class="bg-blue-600 hover:bg-blue-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-3 w-full h-16"
            @click="fetchProfile"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Refresh Profile</span>
          </button>

          <button
            class="bg-indigo-600 hover:bg-indigo-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center space-x-3 w-full h-16"
            @click="fetchProtectedData"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Protected Data</span>
          </button>
        </div>
      </div>

      <!-- Protected Data Display -->
      <div
        v-if="protectedData"
        class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto animate-slide-up"
      >
        <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
          <svg
            class="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Protected Data Retrieved</span>
        </h3>
        <div class="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
          <pre class="text-sm text-gray-800 overflow-auto max-h-96 whitespace-pre-wrap">{{ JSON.stringify(protectedData, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <!-- Guest Section -->
    <div
      v-else
      class="space-y-8"
    >
      <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto text-center animate-slide-up">
        <div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg
            class="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Secure Access Required
        </h2>
        <p class="text-xl text-gray-600 mb-8 leading-relaxed">
          Log in or create an account to access authentication features and discover the capabilities of our JWT module.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink
            to="/login"
            class="bg-blue-600 hover:bg-blue-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-3 w-full sm:w-auto"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span>Sign In</span>
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="bg-green-600 hover:bg-green-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center space-x-3 w-full sm:w-auto"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <span>Create Account</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Features Showcase -->
      <div class="max-w-4xl mx-auto">
        <h3 class="text-2xl font-bold text-gray-900 text-center mb-8">
          Module Features
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              JWT Security
            </h4>
            <p class="text-gray-600 text-sm">
              Secure authentication with JWT tokens and refresh tokens
            </p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 text-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              Performance
            </h4>
            <p class="text-gray-600 text-sm">
              Optimized for Nuxt 3 with reactive composables
            </p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              Configuration
            </h4>
            <p class="text-gray-600 text-sm">
              Simple and flexible configuration for all projects
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Alert -->
    <div
      v-if="error"
      class="max-w-2xl mx-auto mt-8 animate-slide-up"
    >
      <div class="bg-red-50 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-r-lg shadow-sm flex items-start space-x-3">
        <svg
          class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h4 class="font-semibold">
            Error
          </h4>
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const protectedData = ref(null)
const error = ref('')

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const fetchProfile = async () => {
  try {
    error.value = ''
    await auth.getProfile()
  }
  catch (err) {
    error.value = 'Error refreshing profile: ' + err.message
  }
}

const fetchProtectedData = async () => {
  try {
    error.value = ''
    protectedData.value = await auth.authenticatedFetch('/api/protected/users')
  }
  catch (err) {
    error.value = 'Error retrieving protected data: ' + err.message
  }
}
</script>
