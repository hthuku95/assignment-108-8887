import { createPinia } from 'pinia'
import { useAuthStore } from './modules/auth'
import { useCartStore } from './modules/cart'
import { useProductStore } from './modules/products'
import { useOrderStore } from './modules/orders'
import { useWishlistStore } from './modules/wishlist'

const pinia = createPinia()

// Persistence plugin for cart and auth
pinia.use(({ store }) => {
  // Save state to localStorage
  const saveToStorage = (key, state) => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }

  // Load state from localStorage
  const loadFromStorage = (key) => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
      return null
    }
  }

  // Initialize state from localStorage for specific stores
  if (store.$id === 'cart') {
    const savedCart = loadFromStorage('cart')
    if (savedCart) {
      store.$patch(savedCart)
    }

    // Watch for changes and save to localStorage
    store.$subscribe((mutation, state) => {
      saveToStorage('cart', {
        items: state.items,
        total: state.total,
        itemCount: state.itemCount
      })
    })
  }

  if (store.$id === 'auth') {
    const savedAuth = loadFromStorage('auth')
    if (savedAuth) {
      store.$patch(savedAuth)
    }

    // Watch for changes and save to localStorage
    store.$subscribe((mutation, state) => {
      saveToStorage('auth', {
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token
      })
    })
  }

  if (store.$id === 'wishlist') {
    const savedWishlist = loadFromStorage('wishlist')
    if (savedWishlist) {
      store.$patch(savedWishlist)
    }

    // Watch for changes and save to localStorage
    store.$subscribe((mutation, state) => {
      saveToStorage('wishlist', {
        items: state.items
      })
    })
  }
})

export default pinia

export {
  useAuthStore,
  useCartStore,
  useProductStore,
  useOrderStore,
  useWishlistStore
}