<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <!-- Logo e título -->
      <div class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 mx-auto text-green-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
            clip-rule="evenodd"
          />
        </svg>
        <h2 class="mt-4 text-2xl font-bold text-gray-800">SafeStock</h2>
        <p class="mt-2 text-sm text-gray-600">
          Crie sua conta para acessar o sistema
        </p>
      </div>
      
      <!-- Mensagem de erro genérica -->
      <div
        v-if="errorMessage"
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
      >
        {{ errorMessage }}
      </div>

      <!-- Formulário -->
      <form class="mt-8 space-y-6" @submit.prevent="handleSignUp">
        <div class="space-y-4">
          <!-- Nome -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              v-model="name"
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              required
              :class="`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-green-500 ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`"
              placeholder="Seu nome completo"
            />
            <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
          </div>
          
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              :class="`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-green-500 ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`"
              placeholder="nome@empresa.com"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Senha -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              :class="`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-green-500 ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`"
              placeholder="••••••••"
            />
            <p v-if="errors.password" class="mt-1 text-xs text-red-600">{{ errors.password }}</p>
          </div>   
        </div>

        <div class="flex items-center">
          <input
            v-model="termsAccepted"
            id="terms"
            name="terms"
            type="checkbox"
            required
            class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-900">
            Eu concordo com os <a href="#" class="font-medium text-green-600 hover:text-green-500">Termos de Serviço</a> e <a href="#" class="font-medium text-green-600 hover:text-green-500">Política de Privacidade</a>
          </label>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            :disabled="isLoading"
          >
            <span
              v-if="isLoading"
              class="absolute left-0 inset-y-0 flex items-center pl-3"
            >
              <SpinnerComponent size="5" color="text-white" :showLabel="false" />
            </span>
            {{ isLoading ? "Registrando..." : "Registrar" }}
          </button>
        </div>
      </form>

      <!-- Rodapé com opção de login -->
      <div class="text-center mt-4">
        <p class="text-sm text-gray-600">
          Já tem uma conta?
          <a
            @click="goToLogin"
            class="font-medium text-green-600 hover:text-green-500 cursor-pointer"
          >
            Faça login
          </a>
        </p>

        <p class="mt-4 text-sm text-gray-500">
          <button
            @click="goToHome"
            class="text-green-600 hover:text-green-500 font-medium"
          >
            Voltar para a página inicial
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import z from "zod";

const router = useRouter();
const authStore = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");
const termsAccepted = ref(false);
const errorMessage = ref("");

const isLoading = computed(() => authStore.loading);
const storeError = computed(() => authStore.error);

const errors = reactive<{ name?: string; email?: string; password?: string }>({});

const signUpSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"), 
});

const handleSignUp = async () => {
  // Resetar mensagens de erro
  errorMessage.value = "";
  Object.keys(errors).forEach(key => delete errors[key as keyof typeof errors]);
  // Verificar campos vazios
  if (!name.value || !email.value || !password.value) {
    errorMessage.value = "Por favor, preencha todos os campos";
    return;
  }

  // Verificar termos aceitos
  if (!termsAccepted.value) {
    errorMessage.value = "Você deve aceitar os termos de serviço";
    return;
  }

  try {
    const result = signUpSchema.safeParse({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    if (!result.success) {
      // Processar erros de validação específicos para cada campo
      result.error.errors.forEach(err => {
        const path = err.path[0] as keyof typeof errors;
        if (path) {
          errors[path] = err.message;
        }
      });
      return;
    }

    // Limpar mensagens de erro anteriores
    errorMessage.value = "";    // Fazer requisição HTTP para cadastrar o usuário
    const success = await authStore.signup({
      name: name.value,
      email: email.value,
      password: password.value
    });

    if (success) {
      console.log("Registro bem-sucedido:", {
        name: name.value,
        email: email.value
      });
      // Redirecionar para a página de login após o registro
      router.push({ name: "login" });
    } else {
      // Se houver um erro na store, exibir esse erro
      errorMessage.value = storeError.value || "Falha ao criar conta. Por favor, tente novamente.";
    }
  } catch (error) {
    errorMessage.value = "Falha ao criar conta. Por favor, tente novamente.";
    console.error("Erro de registro:", error);
  }
};

const goToLogin = () => {
  router.push({ name: "login" });
};

const goToHome = () => {
  router.push({ name: "home" });
};
</script>

<style scoped>
.text-primary {
  color: var(--color-primary);
}

.bg-primary {
  background-color: var(--color-primary);
}

.hover\:bg-primary-hover:hover {
  background-color: var(--color-primary-hover);
}

.focus\:ring-primary:focus {
  --tw-ring-color: var(--color-primary);
}

.hover\:text-primary:hover {
  color: var(--color-primary);
}

.bg-gradient-primary {
  background: linear-gradient(
    to right,
    var(--color-primary),
    var(--color-secondary)
  );
}
</style>