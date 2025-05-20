<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView name="header" />
  <main class="p-4">
    <RouterView />
  </main>
</template>