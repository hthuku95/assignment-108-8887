import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isLoading: false,
    error: null
  }),

  getters: {
    cartItems: (state) => state.items,
    
    cartItemsCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    
    cartTotal: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    
    cartSubtotal: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    
    cartTax: (state) => {
      const subtotal = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
      return subtotal * 0.08 // 8% tax rate
    },
    
    cartGrandTotal: (state) => {
      const subtotal = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
      const tax = subtotal * 0.08
      return subtotal + tax
    },
    
    getCartItemById: (state) => (id) => {
      return state.items.find(item => item.id === id)
    },
    
    isInCart: (state) => (productId) => {
      return state.items.some(item => item.id === productId)
    }
  },

  actions: {
    addToCart(product) {
      try {
        this.isLoading = true
        this.error = null
        
        const existingItem = this.items.find(item => item.id === product.id)
        
        if (existingItem) {
          existingItem.quantity += 1
        } else {
          this.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1,
            addedAt: new Date().toISOString()
          })
        }
        
        this.saveToLocalStorage()
        this.isLoading = false
      } catch (error) {
        this.error = 'Failed to add item to cart'
        this.isLoading = false
        console.error('Add to cart error:', error)
      }
    },
    
    removeFromCart(productId) {
      try {
        this.isLoading = true
        this.error = null
        
        const index = this.items.findIndex(item => item.id === productId)
        if (index !== -1) {
          this.items.splice(index, 1)
        }
        
        this.saveToLocalStorage()
        this.isLoading = false
      } catch (error) {
        this.error = 'Failed to remove item from cart'
        this.isLoading = false
        console.error('Remove from cart error:', error)
      }
    },
    
    updateQuantity(productId, quantity) {
      try {
        this.isLoading = true
        this.error = null
        
        if (quantity <= 0) {
          this.removeFromCart(productId)
          return
        }
        
        const item = this.items.find(item => item.id === productId)
        if (item) {
          item.quantity = quantity
        }
        
        this.saveToLocalStorage()
        this.isLoading = false
      } catch (error) {
        this.error = 'Failed to update item quantity'
        this.isLoading = false
        console.error('Update quantity error:', error)
      }
    },
    
    incrementQuantity(productId) {
      const item = this.items.find(item => item.id === productId)