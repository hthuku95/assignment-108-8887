import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    product: null,
    categories: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: '',
    sortBy: 'name',
    sortOrder: 'asc',
    currentPage: 1,
    itemsPerPage: 12,
    totalProducts: 0,
    cart: [],
    wishlist: []
  }),

  getters: {
    filteredProducts: (state) => {
      let filtered = [...state.products]

      // Filter by search query
      if (state.searchQuery) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
      }

      // Filter by category
      if (state.selectedCategory) {
        filtered = filtered.filter(product => product.category === state.selectedCategory)
      }

      // Sort products
      filtered.sort((a, b) => {
        let aValue = a[state.sortBy]
        let bValue = b[state.sortBy]

        if (state.sortBy === 'price') {
          aValue = parseFloat(aValue)
          bValue = parseFloat(bValue)
        }

        if (state.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })

      return filtered
    },

    paginatedProducts: (state) => {
      const filtered = state.filteredProducts
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return filtered.slice(start, end)
    },

    totalPages: (state) => {
      return Math.ceil(state.filteredProducts.length / state.itemsPerPage)
    },

    cartItemsCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },

    cartTotal: (state) => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    },

    wishlistCount: (state) => {
      return state.wishlist.length
    },

    isInWishlist: (state) => {
      return (productId) => state.wishlist.some(item => item.id === productId)
    },

    getCartItem: (state) => {
      return (productId) => state.cart.find(item => item.id === productId)
    }
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null

      try {
        // Simulate API call - replace with actual API endpoint
        const response = await this.simulateProductsAPI()
        this.products = response.data
        this.totalProducts = response.data.length
      } catch (error) {
        this.error = 'Failed to fetch products'
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchProduct(id) {
      this.loading = true
      this.error = null

      try {
        const product = this.products.find(p => p.id === parseInt(id))
        if (product) {
          this.product = product
        } else {
          throw new Error('Product not found')
        }
      } catch (error) {
        this.error = 'Failed to fetch product'
        console.error('Error fetching product:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      try {
        const categories = [...new Set(this.products.map(product => product.category))]
        this.categories = categories
      } catch (error) {
        console.error('Error fetching