<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal-container">
      <div class="modal-content">
        <h3 class="text-lg font-bold mb-4">{{ isEdit ? 'Editar Produto' : 'Adicionar Produto' }}</h3>
        <form @submit.prevent="handleSubmit">        <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700">Nome</label>
            <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2 mt-1" required />
          </div>
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700">Categoria</label>
            <input v-model="form.category" type="text" class="w-full border rounded px-3 py-2 mt-1" required />
          </div>
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700">Preço</label>
            <input v-model.number="form.price" type="number" step="0.01" class="w-full border rounded px-3 py-2 mt-1" required />
          </div>
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700">Estoque</label>
            <input v-model.number="form.quantity" type="number" class="w-full border rounded px-3 py-2 mt-1" required />
          </div>
          <div class="flex justify-end space-x-2 mt-4">
            <button type="button" class="btn btn-outline" @click="$emit('close')" :disabled="loading">Cancelar</button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-if="loading">Salvando...</span>
              <span v-else>Salvar</span>
            </button>
          </div>
        </form>
        <button class="modal-close-btn" @click="$emit('close')">&times;</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref, computed } from 'vue';
import productService, { type Product } from '../services/productService';

const props = defineProps<{ show: boolean, produto?: Product }>();
const emit = defineEmits(['save', 'close']);

const loading = ref(false);
const isEdit = computed(() => !!props.produto?.id);

const form = reactive({
  name: '',
  category: '',
  price: 0,
  quantity: 0
});

watch(() => props.produto, (val) => {
  if (val) {
    form.name = val.name;
    form.category = val.category;
    form.price = val.price;
    form.quantity = val.quantity;
  } else {
    form.name = '';
    form.category = '';
    form.price = 0;
    form.quantity = 0;
  }
}, { immediate: true });// Atualiza o formulário quando o produto é passado como prop
//imediate: true garante que a função de callback seja chamada imediatamente após a definição do watcher, mesmo que o valor não tenha mudado.

async function handleSubmit() {
  if (loading.value) return;
  
  loading.value = true;
  try {
    if (isEdit.value && props.produto?.id) {
      // Editar produto existente
      await productService.updateProduct(props.produto.id, {
        name: form.name,
        category: form.category,
        price: form.price,
        quantity: form.quantity
      });
    } else {
      // Criar novo produto
      await productService.createProduct({
        name: form.name,
        category: form.category,
        price: form.price,
        quantity: form.quantity
      });
    }
  } catch (error) {
    console.error('Erro ao salvar produto:', error);
    alert('Erro ao salvar produto. Tente novamente.');
  } finally {
    loading.value = false;
    emit('save');
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.modal-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 28rem;
  margin: 0 1rem;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
  position: relative;
  transform: scale(1);
  transition: all 0.2s ease-in-out;
}

.modal-close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: #9CA3AF;
  font-size: 1.5rem;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.1s ease-in-out;
}

.modal-close-btn:hover {
  color: #6B7280;
}

/* Animação de entrada */
.modal-overlay {
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  animation: slideIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: scale(0.95) translateY(-10px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
</style>
