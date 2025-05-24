<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import LoadingScreen from './components/LoadingScreen.vue'

const isLoading = ref(true)

// Verificar se a aplicação já foi inicializada
onMounted(() => {
  // Aguardar um pequeno tempo para garantir que a inicialização tenha uma chance de concluir
  setTimeout(() => {
    isLoading.value = false
  }, 500) // 500ms deve ser suficiente para a maioria dos casos
})
</script>

<template>
  <!-- Tela de carregamento enquanto a aplicação inicializa -->
  <LoadingScreen v-if="isLoading" message="Inicializando aplicação..." />
  
  <!-- Conteúdo principal quando carregado -->
  <template v-else>
    <RouterView name="header" />
    <main class="p-4">
      <RouterView />
    </main>
  </template>
</template>