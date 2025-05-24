<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <SpinnerComponent size="10" color="text-green-600" :showLabel="true" label="Carregando..." />
      <p class="text-gray-600 mt-4" v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import SpinnerComponent from './SpinnerComponent.vue';
import { defineProps } from 'vue';

defineProps({
  message: {
    type: String,
    default: ''
  }
});
</script>
