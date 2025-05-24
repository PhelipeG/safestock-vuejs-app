<template>
  <LoadingScreen v-if="isLoading" message="Carregando seu dashboard..." />
  
  <div v-else class="dashboard">
    <header class="bg-primary text-white p-4">
      <div class="container-custom flex justify-between items-center">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <div class="text-sm">
          Bem-vindo(a), <span class="font-semibold">{{ userName }}</span>
        </div>
      </div>
    </header>
    <main class="container-custom py-4">
         <div class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Total de Produtos -->
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total de Produtos</p>
                <p class="text-3xl font-bold text-gray-900">{{ stats.total }}</p>
              </div>
              <div class="bg-blue-100 p-3 rounded-full">
                <Package class="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div class="mt-4">
              <span class="text-sm text-gray-500">Total de itens no estoque</span>
            </div>
          </div>

          <!-- Produtos com Estoque Baixo -->
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Estoque Baixo</p>
                <p class="text-3xl font-bold text-gray-900">{{ stats.lowStock }}</p>
              </div>
              <div class="bg-red-100 p-3 rounded-full">
                <AlertTriangle class="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div class="mt-4">
              <span class="text-sm text-gray-500">Produtos com estoque ≤ 10</span>
            </div>
          </div>

          <!-- Valor Total do Estoque -->
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Valor Total</p>
                <p class="text-3xl font-bold text-gray-900">R$ {{ formatCurrency(stats.valorTotal) }}</p>
              </div>
              <div class="bg-green-100 p-3 rounded-full">
                <DollarSign class="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div class="mt-4">
              <span class="text-sm text-gray-500">Valor total do inventário</span>
            </div>
          </div>
        </div>

        <ProductTable
          :reload="reloadTable"
          @add="openAddModal"
          @edit="openEditModal"
          @delete="deleteProduto"
          @updateStats="updateStats"
        /> 
        <ProductModal
          :show="showModal"
          :produto="produtoSelecionado"
          @close="closeModal"
          @save="saveProduto"
        />

        <!-- Modal de Confirmação -->
        <ConfirmModal
          :show="showConfirmModal"
          :title="confirmTitle"
          :message="confirmMessage"
          :confirm-text="confirmButtonText"
          :cancel-text="cancelButtonText"
          @confirm="handleConfirmAction"
          @cancel="handleCancelAction"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import LoadingScreen from '../components/LoadingScreen.vue';
import ProductTable from '../components/ProductTable.vue';
import ProductModal from '../components/ProductModal.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import { Package, AlertTriangle, DollarSign } from 'lucide-vue-next';
import productService, { type Product, type ProductCreateData } from '../services/productService';

const authStore = useAuthStore();
const isLoading = ref(true);
const currentYear = new Date().getFullYear();

const userName = computed(() => {
  return authStore.userName || 'Usuário';
});

// Simular carregamento de dados iniciais
onMounted(async () => {
  // Aqui você poderia carregar os dados iniciais do dashboard
  // Por exemplo: await fetchDashboardData()
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

const showModal = ref(false);
const produtoSelecionado = ref<any>(null);
const reloadTable = ref(false);

// Estados para o modal de confirmação
const showConfirmModal = ref(false);
const confirmTitle = ref('');
const confirmMessage = ref('');
const confirmButtonText = ref('Confirmar');
const cancelButtonText = ref('Cancelar');
const produtoParaDeletar = ref<Product | null>(null);

const stats = ref({
  total: 0,
  lowStock: 0,
  valorTotal: 0
});

function openAddModal() {
  produtoSelecionado.value = null;
  showModal.value = true;
}

function openEditModal(produto: Product) {
  produtoSelecionado.value = { ...produto };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  produtoSelecionado.value = null;
}

async function saveProduto() {
  closeModal();
  reloadTable.value = !reloadTable.value;
}

async function deleteProduto(produto: Product) {
  console.log('🆔 ID do produto:', produto.id);
  
  // Armazenar o produto para exclusão
  produtoParaDeletar.value = produto.id;
  
  // Configurar o modal de confirmação
  confirmTitle.value = 'Excluir Produto';
  confirmMessage.value = `Tem certeza que deseja excluir o produto "${produto.name}"? Esta ação não pode ser desfeita.`;
  confirmButtonText.value = 'Excluir';
  cancelButtonText.value = 'Cancelar';
  
  // Mostrar o modal
  showConfirmModal.value = true;
}

async function handleConfirmAction() {
  showConfirmModal.value = false;

  if (produtoParaDeletar.value) {
    try {
      await productService.deleteProduct(produtoParaDeletar.value);
      reloadTable.value = !reloadTable.value;
      console.log('✅ Produto excluído com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao excluir produto:', error);
      // Aqui você pode adicionar um toast/notificação de erro
    }
  }
  
  produtoParaDeletar.value = null;
}

function handleCancelAction() {
  showConfirmModal.value = false;
  produtoParaDeletar.value = null;
}
function updateStats(newStats: any) {
  stats.value = newStats;
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
</script>

<style scoped>
 
</style>