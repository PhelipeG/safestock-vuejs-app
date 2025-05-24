import { defineStore } from "pinia";
import authService from "../services/authService";
import api from "../services/api";

interface User {
  name: string;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: '' as string,
    user: null as User | null,
    loading: false,
    error: null as string | null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user?.name || '',
  },
  actions: {
    setAuthState(token: string, user: User) {
      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    async loadToken() {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      if (savedToken && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser && parsedUser.name && parsedUser.email) {
            this.token = savedToken;
            this.user = parsedUser;
            api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
            return true;
          }
        } catch {}
      }
      this.logout();
      return false;
    },
    async signup(credentials: { email: string; password: string; name?: string }) {
      this.loading = true;
      this.error = null;
      try {
        const response = await authService.signUp(credentials);
        this.setAuthState(response.token, response.user);
        return true;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Erro ao cadastrar usuário';
        return false;
      } finally {
        this.loading = false;
      }
    },
    async login(credentials: { email: string; password: string }) {
      this.loading = true;
      this.error = null;
      try {
        const response = await authService.login(credentials);
        this.setAuthState(response.token, response.user);
        return true;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Erro ao autenticar usuário';
        return false;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common['Authorization'];
    }
  }
})

