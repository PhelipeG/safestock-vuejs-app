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
          Faça login para acessar o sistema
        </p>
      </div>      <!-- Mensagem de erro genérica -->
      <div
        v-if="errorMessage"
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
      >
        {{ errorMessage }}
      </div>

      <!-- Formulário -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
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
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Senha</label
            >
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              :class="`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-green-500 ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`"
              placeholder="••••••••"
            />
            <p v-if="errors.password" class="mt-1 text-xs text-red-600">{{ errors.password }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              v-model="rememberMe"
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"
              >Lembrar-me</label
            >
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-green-600 hover:text-green-500"
              >Esqueceu a senha?</a
            >
          </div>
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
            {{ isLoading ? "Entrando..." : "Entrar" }}
          </button>
        </div>
      </form>

      <!-- Rodapé com opção de registro -->
      <div class="text-center mt-4">
        <p class="text-sm text-gray-600">
          Não tem uma conta?
          <a
            @click="goToSignUp"
            class="font-medium text-green-600 hover:text-green-500 cursor-pointer"
          >
            Registre-se
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

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const errorMessage = ref("");

const isLoading = computed(() => authStore.loading);
const storeError = computed(() => authStore.error);

const errors = reactive<{ email?: string; password?: string }>({});

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

const handleLogin = async () => {
  // Resetar mensagens de erro
  errorMessage.value = "";
  Object.keys(errors).forEach(key => delete errors[key as keyof typeof errors]);

  // Verificar campos vazios
  if (!email.value || !password.value) {
    errorMessage.value = "Por favor, preencha todos os campos";
    return;
  }

  try {
    const result = loginSchema.safeParse({
      email: email.value,
      password: password.value,
    });

    if (!result.success) {
      // Processar erros de validação específicos para cada campo
      result.error.errors.forEach(err => {
        const path = err.path[0] as keyof typeof errors;
        if (path && (path === 'email' || path === 'password')) {
          errors[path] = err.message;
        }
      });
      return;
    }    // Limpar mensagens de erro anteriores
    errorMessage.value = "";

    // Fazer requisição HTTP para autenticar o usuário
    const success = await authStore.login({
      email: email.value,
      password: password.value
    });

    if (success) {
      // Se lembrar-me estiver marcado, podemos fazer alguma lógica adicional aqui
      if (rememberMe.value) {
        // Por exemplo, poderíamos definir uma data de expiração mais longa
        console.log("Lembrar-me ativo");
      }
      
      // Redirecionar para o dashboard após login bem-sucedido
      router.push({ name: "dashboard" });
      console.log("Login bem-sucedido:", {
        email: email.value,
        rememberMe: rememberMe.value,
      });
    } else {
      // Se houver um erro na store, exibir esse erro
      errorMessage.value = storeError.value || "Falha na autenticação. Verifique suas credenciais.";
    }
  } catch (error) {
    errorMessage.value = "Falha na autenticação. Verifique suas credenciais.";
    console.error("Erro de login:", error);
  }
};

const goToSignUp = () => {
  router.push({ name: "signup" });
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
