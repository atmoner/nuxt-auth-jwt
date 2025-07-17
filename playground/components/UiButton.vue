<template>
  <button
    :class="[
      'relative font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      buttonClasses
    ]"
    :disabled="loading || disabled"
    v-bind="$attrs"
  >
    <span v-if="loading" class="absolute left-1/2 transform -translate-x-1/2">
      <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <span :class="{ 'opacity-0': loading }">
      <slot />
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'danger'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const buttonClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500'
    case 'secondary':
      return 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500'
    case 'success':
      return 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
    case 'danger':
      return 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
    default:
      return 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500'
  }
})
</script>
