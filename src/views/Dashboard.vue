<template>
  <div class="dashboard">
    <header class="bg-primary text-white p-4">
      <h1 class="text-2xl font-bold">Dashboard</h1>
    </header>
    <main class="container-custom py-4">
      <router-view />
    </main>
    <footer class="bg-gray-800 text-white p-4 text-center">
      <p>&copy; 2023 SafeStock. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
 
</style>