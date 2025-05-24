// services/auth.ts
import api from './api'

interface SignUpCredentials {
  email: string
  password: string
  name?: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface AuthResponse {
  token: string
  user: {
    name: string
    email: string
  }
}

const authService = {
  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', credentials)
    return response.data
  },
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    return response.data
  }
}

export default authService
