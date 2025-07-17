<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="card max-w-md w-full space-y-8 animate-slide-up">
      <div class="text-center">
        <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
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
            class="form-label"
          >
            Email Address
          </label>
          <div class="relative">
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="form-input pl-10"
              placeholder="your@email.com"
            >
          </div>
        </div>

        <div>
          <label
            for="username"
            class="form-label"
          >
            Username
          </label>
          <div class="relative">
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              minlength="3"
              class="form-input pl-10"
              placeholder="Your username"
            >
          </div>
        </div>

        <div>
          <label
            for="password"
            class="form-label"
          >
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="form-input pl-10"
              placeholder="Minimum 6 characters"
            >
          </div>
        </div>

        <div>
          <label
            for="confirmPassword"
            class="form-label"
          >
            Confirm Password
          </label>
          <div class="relative">
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="form-input pl-10"
              placeholder="Confirm your password"
            >
          </div>
        </div>

        <div
          v-if="error"
          class="alert-error flex items-center space-x-2"
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
          class="alert-success flex items-center space-x-2"
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
            class="btn-success w-full relative"
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
            class="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
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
