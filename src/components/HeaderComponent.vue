<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="container-custom py-3">
      <div class="flex items-center justify-between">
        <!-- Logo e Título -->
        <div class="flex items-center">
          <Package2 class="h-8 w-8 text-primary" />
          <h1 class="ml-2 text-xl font-bold text-primary">SafeStock</h1>
        </div>
        
        <!-- Avatar e Ações do Usuário -->
        <div class="flex items-center space-x-4">
          <!-- Notificações (opcional) -->
          <div class="relative">
            <button class="text-gray-600 hover:text-primary transition-colors">
              <Bell class="h-6 w-6" />
              <span v-if="notificationCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {{ notificationCount }}
              </span>
            </button>
          </div>
          
          <!-- Dropdown do Usuário -->
          <div class="relative" v-click-outside="closeUserMenu">
            <div 
              @click="toggleUserMenu" 
              class="flex items-center space-x-3 cursor-pointer"
            >
              <div class="flex flex-col items-end">
                <span class="text-sm font-semibold text-gray-700">{{ user.name }}</span>
                <span class="text-xs text-gray-500">{{ user.role }}</span>
              </div>
              <div class="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold overflow-hidden">
                <img 
                  v-if="user.avatar" 
                  :src="user.avatar" 
                  :alt="user.name" 
                  class="h-full w-full object-cover"
                >
                <template v-else>
                  {{ userInitials }}
                </template>
              </div>
            </div>
            
            <!-- Menu do Usuário -->
            <div 
              v-show="userMenuOpen" 
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
            >              <button @click="navigateTo('/')" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <Home class="h-5 w-5 mr-2 text-gray-500" />
                Página Inicial
              </button>
              <button @click="navigateTo('/profile')" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <User class="h-5 w-5 mr-2 text-gray-500" />
                Meu Perfil
              </button>
              <button @click="navigateTo('/settings')" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <Settings class="h-5 w-5 mr-2 text-gray-500" />
                Configurações
              </button>
              <div class="border-t border-gray-200 my-1"></div>
              <button @click="logout" class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                <LogOut class="h-5 w-5 mr-2 text-red-500" />
                Sair
              </button>
            </div>
          </div>
            <!-- Botões Rápidos (Visíveis sempre) -->
          <div class="flex space-x-2">
            <button 
              @click="navigateTo('/')" 
              class="btn-outline py-1 px-3 text-sm rounded flex items-center"
              title="Página Inicial"
            >
              <Home class="h-5 w-5" />
              <span class="ml-1 hidden sm:inline">Início</span>
            </button>
            <button 
              @click="logout" 
              class="btn-outline py-1 px-3 text-sm rounded border-red-500 text-red-500 hover:bg-red-50 flex items-center"
              title="Sair do Sistema"
            >
              <LogOut class="h-5 w-5" />
              <span class="ml-1 hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { 
  Package2, 
  Bell, 
  Home, 
  User, 
  Settings, 
  LogOut 
} from 'lucide-vue-next';

// Diretiva para detectar cliques fora de um elemento
const vClickOutside = {
  mounted(el: any, binding: any) {
    el._clickOutside = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el._clickOutside);
  },
  unmounted(el: any) {
    document.removeEventListener('click', el._clickOutside);
  }
};

// Router
const router = useRouter();
const authStore = useAuthStore();

// Estado do menu de usuário
const userMenuOpen = ref(false);

// Estado de notificações
const notificationCount = ref(2);

// Dados do usuário (vindo do store de auth)
const user = computed(() => {
  return {
    name: authStore.user?.name || 'Usuário',
    avatar: '', // Se vazio, mostrará as iniciais
  };
});

// Computed
const userInitials = computed(() => {
  if (!user.value.name) return '';
  return user.value.name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
});

// Métodos
const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value;
};

const closeUserMenu = () => {
  userMenuOpen.value = false;
};

const navigateTo = (path: string) => {
  closeUserMenu();
  router.push(path); // Mantemos essa forma para caminhos genéricos
};

const logout = () => {
  // Lógica para deslogar o usuário
  closeUserMenu();
  authStore.logout(); // Usar o método de logout do store
  router.push({ name: 'login' });
};
</script>

