<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 max-w-md w-full space-y-8 animate-slide-up">
      <div class="text-center">
        <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg
            class="w-8 h-8 text-white"
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
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Create Account
        </h1>
        <p class="text-gray-600 mb-8">
          Join us and discover all the features
        </p>
      </div>

      <form
        class="space-y-6"
        @submit.prevent="handleRegister"
      >
        <div>
          <label
            for="email"
            class="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email Address
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
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
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              placeholder="your@email.com"
            >
          </div>
        </div>

        <div>
          <label
            for="username"
            class="block text-sm font-semibold text-gray-700 mb-2"
          >
            Username
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
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
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              minlength="3"
              class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              placeholder="Your username"
            >
          </div>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-semibold text-gray-700 mb-2"
          >
            Password
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
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
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              placeholder="Minimum 6 characters"
            >
          </div>
          <!-- Password strength indicator -->
          <div
            v-if="form.password"
            class="mt-2"
          >
            <div class="flex items-center space-x-2">
              <div class="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  :class="passwordStrength.color"
                  class="h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${(passwordStrength.score / 6) * 100}%` }"
                />
              </div>
              <span
                class="text-xs font-medium"
                :class="{
                  'text-red-600': passwordStrength.label === 'Weak',
                  'text-yellow-600': passwordStrength.label === 'Medium',
                  'text-green-600': passwordStrength.label === 'Strong',
                }"
              >
                {{ passwordStrength.label }}
              </span>
            </div>
          </div>
        </div>

        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-semibold text-gray-700 mb-2"
          >
            Confirm Password
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              :class="{
                'border-green-300 bg-green-50/50': form.confirmPassword && form.password === form.confirmPassword,
                'border-red-300 bg-red-50/50': form.confirmPassword && form.password !== form.confirmPassword,
              }"
              placeholder="Confirm your password"
            >
          </div>
          <!-- Password match indicator -->
          <div
            v-if="form.confirmPassword"
            class="mt-2"
          >
            <div
              v-if="form.password === form.confirmPassword"
              class="flex items-center space-x-1 text-green-600 text-xs"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Passwords match</span>
            </div>
            <div
              v-else
              class="flex items-center space-x-1 text-red-600 text-xs"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Passwords don't match</span>
            </div>
          </div>
        </div>

        <div
          v-if="error"
          class="bg-red-50 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-r-lg shadow-sm flex items-center space-x-2"
        >
          <svg
            class="w-5 h-5 flex-shrink-0"
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
          <span>{{ error }}</span>
        </div>

        <div
          v-if="success"
          class="bg-green-50 border-l-4 border-green-500 text-green-800 px-6 py-4 rounded-r-lg shadow-sm flex items-center space-x-2"
        >
          <svg
            class="w-5 h-5 flex-shrink-0"
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
          <span>{{ success }}</span>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full relative"
          >
            <span
              v-if="loading"
              class="absolute left-1/2 transform -translate-x-1/2"
            >
              <svg
                class="animate-spin h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
            <span :class="{ 'opacity-0': loading }">
              Create Account
            </span>
          </button>
        </div>
      </form>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          Already have an account?
          <NuxtLink
            to="/login"
            class="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
          >
            Sign In
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const form = ref({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
})
const loading = ref(false)
const error = ref('')
const success = ref('')

// Password strength indicator
const passwordStrength = computed(() => {
  const password = form.value.password
  if (!password) return { score: 0, label: '', color: '' }

  let score = 0
  if (password.length >= 6) score += 1
  if (password.length >= 8) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Z0-9]/i.test(password)) score += 1

  if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' }
  if (score <= 4) return { score, label: 'Medium', color: 'bg-yellow-500' }
  return { score, label: 'Strong', color: 'bg-green-500' }
})

const handleRegister = async () => {
  if (loading.value) return

  try {
    loading.value = true
    error.value = ''
    success.value = ''

    // Password validation
    if (form.value.password !== form.value.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    if (form.value.password.length < 6) {
      throw new Error('Password must contain at least 6 characters')
    }

    if (form.value.username.length < 3) {
      throw new Error('Username must contain at least 3 characters')
    }

    await auth.register(form.value.email, form.value.username, form.value.password)
    success.value = 'Account created successfully! Redirecting...'

    setTimeout(async () => {
      await navigateTo('/')
    }, 2000)
  }
  catch (err) {
    error.value = err.message || 'Error creating account'
  }
  finally {
    loading.value = false
  }
}
</script>
