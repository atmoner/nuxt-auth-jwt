<template>
  <div
    :class="[
      'flex items-start space-x-3 px-6 py-4 rounded-r-lg shadow-sm',
      alertClasses,
    ]"
  >
    <component
      :is="iconComponent"
      class="w-5 h-5 flex-shrink-0 mt-0.5"
    />
    <div>
      <h4
        v-if="title"
        class="font-semibold"
      >
        {{ title }}
      </h4>
      <p>
        <slot />
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: value => ['success', 'error', 'warning', 'info'].includes(value),
  },
  title: {
    type: String,
    default: '',
  },
})

const alertClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-50 border-l-4 border-green-500 text-green-800'
    case 'error':
      return 'bg-red-50 border-l-4 border-red-500 text-red-800'
    case 'warning':
      return 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800'
    case 'info':
      return 'bg-blue-50 border-l-4 border-blue-500 text-blue-800'
    default:
      return 'bg-blue-50 border-l-4 border-blue-500 text-blue-800'
  }
})

const iconComponent = computed(() => {
  // Pour le moment, on retourne juste 'svg' car on utilise des SVG inline
  return 'svg'
})
</script>
