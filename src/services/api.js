import axios from 'axios'

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'https://api.example.com'

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  // Generic HTTP methods
  async get(endpoint, params = {}) {
    try {
      const response = await this.client.get(endpoint, { params })
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async post(endpoint, data = {}) {
    try {
      const response = await this.client.post(endpoint, data)
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async put(endpoint, data = {}) {
    try {
      const response = await this.client.put(endpoint, data)
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async delete(endpoint) {
    try {
      const response = await this.client.delete(endpoint)
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  // Product API methods
  async getProducts(params = {}) {
    return this.get('/products', params)
  }

  async getProduct(id) {
    return this.get(`/products/${id}`)
  }

  async searchProducts(query, filters = {}) {
    return this.get('/products/search', { q: query, ...filters })
  }

  async getProductsByCategory(categoryId, params = {}) {
    return this.get(`/categories/${categoryId}/products`, params)
  }

  // Category API methods
  async getCategories() {
    return this.get('/categories')
  }

  async getCategory(id) {
    return this.get(`/categories/${id}`)
  }

  // Cart API methods
  async getCart() {
    return this.get('/cart')
  }

  async addToCart(productId, quantity = 1, options = {}) {
    return this.post('/cart/items', {
      product_id: productId,
      quantity,
      ...options
    })
  }

  async updateCartItem(itemId, quantity) {
    return this.put(`/cart/items/${itemId}`, { quantity })
  }

  async removeFromCart(itemId) {
    return this.delete(`/cart/items/${itemId}`)
  }

  async clearCart() {
    return this.delete('/cart')
  }

  // Order API methods
  async getOrders(params = {}) {
    return this.get('/orders', params)
  }

  async getOrder(id) {
    return this.get(`/orders/${id}`)
  }

  async createOrder(orderData) {
    return this.post('/orders', orderData)
  }

  async updateOrderStatus(id, status) {
    return