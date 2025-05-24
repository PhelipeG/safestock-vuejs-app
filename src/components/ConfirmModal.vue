<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-backdrop" @click="handleCancel"></div>
    <div class="modal-container">
      <div class="modal-content">
        <!-- Ícone de aviso -->
        <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <AlertTriangle class="w-6 h-6 text-red-600" />
        </div>
        
        <!-- Título -->
        <h3 class="text-lg font-bold text-center mb-3">{{ title }}</h3>
        
        <!-- Mensagem -->
        <p class="text-gray-600 text-center mb-6">{{ message }}</p>
        
        <!-- Botões -->
        <div class="flex justify-end space-x-2">
          <button @click="handleCancel" class="btn btn-outline">
            {{ cancelText }}
          </button>
          <button @click="handleConfirm" class="btn btn-primary bg-red-600 hover:bg-red-700">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next'

interface Props {
  show: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Confirmar Ação',
  confirmText: 'Confirmar',
  cancelText: 'Cancelar'
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

function handleConfirm() {
  emit('confirm')
}

function handleCancel() {
  emit('cancel')
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
  animation: fadeIn 0.2s ease-out;
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
  animation: slideIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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
