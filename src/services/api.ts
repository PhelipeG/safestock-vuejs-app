// services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // ou a URL da sua API
  timeout: 10000, // timeout de 10s para as requisições
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Interceptador para adicionar o token de autenticação às requisições
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Interceptador para tratar respostas e erros comuns como token expirado
api.interceptors.response.use(
  response => response,
  error => {
    // Tratar erros específicos da API
    const status = error.response?.status

    if (status === 401) {
      // Token inválido ou expirado: Redirecionando para login
      console.error('Sessão expirada ou token inválido')
      
      // Importar o store de autenticação - precisamos importar dinamicamente para evitar ciclos
      import('../stores/auth').then(({ useAuthStore }) => {
        const authStore = useAuthStore()
        // Usar o método logout do store para garantir limpeza completa
        authStore.logout()
        
        // Redirecionar para login
        import('../router').then(({ default: router }) => {
          router.push({ name: 'login' })
        })
      }).catch(err => {
        console.error('Erro ao processar logout após 401:', err)
        // Fallback: remover itens manualmente se não conseguir usar o store
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        // Forçar reload da página para limpar o estado
        window.location.href = '/login'
      })
    }
    
    return Promise.reject(error)
  }
)

export default api
