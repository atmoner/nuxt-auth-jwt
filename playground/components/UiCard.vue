<template>
  <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 animate-slide-up">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  className: {
    type: String,
    default: '',
  },
})
</script>
