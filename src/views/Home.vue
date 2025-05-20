

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isVisible = ref(false);

const navigateToLogin = () => {
  router.push('/login');
};

const navigateToSignUp = () => {
  router.push('/signup');
};

onMounted(() => {
  isVisible.value = true;
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Navegação -->
    <nav class="bg-white border-b border-gray-100 px-6 py-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
          </svg>
          <span class="ml-3 text-2xl font-bold text-green-600">SafeStock</span>
        </div>
        <div class="hidden md:flex items-center space-x-4">
          <a href="#recursos" class="text-gray-700 hover:text-green-600 transition-colors">Recursos</a>
          <a href="#sobre" class="text-gray-700 hover:text-green-600 transition-colors">Sobre</a>
          <a href="#contato" class="text-gray-700 hover:text-green-600 transition-colors">Contato</a>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="navigateToLogin" class="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors">Entrar</button>
          <button @click="navigateToSignUp" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Cadastrar</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative py-20 overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div :class="{'opacity-0 translate-x-[-50px]': !isVisible, 'opacity-100 translate-x-0': isVisible}" class="transition-all duration-1000 ease-out">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Transforme o gerenciamento do seu <span class="text-green-600">estoque</span>
          </h1>
          <p class="text-lg text-gray-600 mb-8">
            Simplifique seu controle de inventário, otimize compras e minimize perdas com nossa plataforma intuitiva e poderosa.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button @click="navigateToSignUp" class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-lg font-medium">
              Comece agora
            </button>
            <a href="#demo" class="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-lg font-medium text-center">
              Ver demonstração
            </a>
          </div>
        </div>
        <div :class="{'opacity-0 translate-x-[50px]': !isVisible, 'opacity-100 translate-x-0': isVisible}" class="transition-all duration-1000 delay-300 ease-out">
          <div class="relative">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur opacity-30"></div>
            <div class="relative bg-white p-6 rounded-lg shadow-xl">
              <img src="https://placehold.co/600x400/1a7a40/FFFFFF?text=SafeStock+Dashboard" alt="SafeStock Dashboard" class="rounded-md w-full h-auto">
            </div>
          </div>
        </div>
      </div>
      
      <!-- Decoração de fundo -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
    </section>

    <!-- Seção de recursos -->
    <section id="recursos" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Funcionalidades do SafeStock</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Nosso sistema oferece ferramentas poderosas para seu controle de estoque, com recursos que tornam a gestão simples e eficiente</p>
        </div>
          <div class="grid md:grid-cols-3 gap-8">
          <!-- Card 1 - CRUD de Produtos -->
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
            <div class="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600 group-hover:text-white transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800">Gerenciamento de Produtos</h3>
            <p class="text-gray-600">Sistema completo de CRUD para criar, visualizar, atualizar e excluir produtos do seu catálogo com facilidade.</p>
          </div>
          
          <!-- Card 2 - Relatórios -->
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
            <div class="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800">Relatórios Detalhados</h3>
            <p class="text-gray-600">Gere relatórios personalizados sobre seus produtos, incluindo histórico de vendas, valores e desempenho de estoque.</p>
          </div>
          
          <!-- Card 3 - Monitoramento de Estoque -->
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
            <div class="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600 group-hover:text-white transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800">Monitoramento de Estoque</h3>
            <p class="text-gray-600">Acompanhe em tempo real os níveis de estoque dos seus produtos com alertas automáticos para produtos com baixa disponibilidade.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Rodapé -->
    <footer id="contato" class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
              </svg>
              <span class="ml-2 text-xl font-bold">SafeStock</span>
            </div>
            <p class="mt-4 text-gray-400">Simplificando o controle de estoque para empresas de todos os tamanhos.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Estilos adicionais */
html {
  scroll-behavior: smooth;
}

section {
  position: relative;
}

.blur-3xl {
  filter: blur(100px);
}
</style>