<template>
  <div class="flex items-center justify-center" :class="{ 'w-full': fullWidth }">
    <svg
      :class="`animate-spin h-${size} w-${size} ${color}`"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      :aria-label="label"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <span v-if="showLabel" class="ml-2">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: '5', // Tamanho padrão h-5 e w-5
  },
  color: {
    type: String,
    default: 'text-green-600', // Cor padrão
  },
  label: {
    type: String,
    default: 'Carregando...',
  },
  showLabel: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});
</script>
