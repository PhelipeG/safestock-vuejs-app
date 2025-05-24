// services/productService.ts
import api from './api'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  createdAt?: string
  updatedAt?: string
}

export interface ProductCreateData {
  name: string
  category: string
  price: number
  quantity: number
  createdAt?: string
  updatedAt?: string
} 

export interface ProductCreateData {
  name: string
  category: string
  price: number
  quantity: number
  createdAt?: string
  updatedAt?: string
}

export interface ProductCreateData {
  name: string
  category: string
  price: number
  quantity: number
}

export interface ProductUpdateData extends ProductCreateData {
  id: string
}

export interface ProductStats {
  total: number
  lowStock: number
  valorTotal: number
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page?: number
  limit?: number
}

const productService = {
  // Listar todos os produtos
  async getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('/manager/products')
    return response.data
  },

  // Obter um produto específico por ID
  async getProductById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/manager/products/${id}`)
    return response.data
  },

  // Criar um novo produto
  async createProduct(productData: ProductCreateData): Promise<Product> {
    const response = await api.post<Product>('/manager/products', productData)
    return response.data
  },

  // Atualizar um produto existente
  async updateProduct(id: number, productData: ProductCreateData): Promise<Product> {
    const response = await api.put<Product>(`/manager/products/${id}`, productData)
    return response.data
  },

  // Deletar um produto
  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/manager/products/${id}`)
  },

  // Obter estatísticas dos produtos
  async getProductStats(): Promise<ProductStats> {
    try {
      const products = await this.getProducts()
      
      const stats: ProductStats = {
        total: products.length,
        lowStock: products.filter(p => p.quantity <= 10).length,
        valorTotal: products.reduce((total, p) => total + (p.price * p.quantity), 0)
      }
      
      return stats
    } catch (error) {
      console.error('Erro ao calcular estatísticas:', error)
      return {
        total: 0,
        lowStock: 0,
        valorTotal: 0
      }
    }
  },

  // Buscar produtos com estoque baixo
  async getLowStockProducts(threshold: number = 10): Promise<Product[]> {
    const products = await this.getProducts()
    return products.filter(product => product.quantity <= threshold)
  },

  // Atualizar apenas o estoque de um produto
  async updateProductStock(id: number, novoEstoque: number): Promise<Product> {
    const response = await api.patch<Product>(`/manager/products/${id}/estoque`, {
      estoque: novoEstoque
    })
    return response.data
  }
}

export default productService
