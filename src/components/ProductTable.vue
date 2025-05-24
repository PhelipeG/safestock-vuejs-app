<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-bold text-gray-800">Produtos</h2>
      <button @click="$emit('add')" class="btn btn-primary">Adicionar Produto</button>
    </div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estoque</th>
          <th class="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Ações</th>
        </tr>
      </thead>
      <tbody>        <tr v-for="produto in produtos" :key="produto.id" class="hover:bg-gray-50">
          <td class="px-4 py-2">{{ produto.name }}</td>
          <td class="px-4 py-2">{{ produto.category }}</td>
          <td class="px-4 py-2">R$ {{ produto.price?.toFixed(2) }}</td>
          <td class="px-4 py-2">{{ produto.quantity }}</td>
          <td class="px-4 py-2 text-center space-x-2">
            <button class="btn btn-secondary btn-sm" @click="$emit('edit', produto)">Editar</button>
            <button class="btn btn-outline btn-sm" @click="$emit('delete', produto)">Excluir</button>
          </td>
        </tr>
        <tr v-if="produtos.length === 0">
          <td colspan="5" class="text-center text-gray-400 py-4">Nenhum produto encontrado.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import productService, { type Product } from '../services/productService';

const props = defineProps<{ reload?: boolean }>();
const emit = defineEmits(['add', 'edit', 'delete', 'updateStats']);// defineEmits - defineEmits é uma função que permite definir os eventos que o componente pode emitir.

const produtos = ref<Product[]>([]);
const loading = ref(false);

async function fetchProdutos() {
  loading.value = true;
  try {
    produtos.value = await productService.getProducts();
    
    // Obtém estatísticas usando o serviço
    const stats = await productService.getProductStats();
    emit('updateStats', stats);
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    produtos.value = [];
    emit('updateStats', { total: 0, lowStock: 0, valorTotal: 0 });
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProdutos);
watch(() => props.reload, fetchProdutos);
</script>

<style scoped>
.btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}
</style>
