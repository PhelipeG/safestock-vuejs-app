// services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333' // ou a URL da sua API
})

export default api
