import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token') || null)
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userRole = computed(() => user.value?.role || 'customer')
  const userName = computed(() => user.value?.name || '')
  const userEmail = computed(() => user.value?.email || '')

  // Actions
  const login = async (credentials) => {
    try {
      isLoading.value = true
      error.value = null

      const response = await axios.post('/api/auth/login', credentials)
      
      if (response.data.success) {
        token.value = response.data.token
        user.value = response.data.user
        
        // Store token in localStorage
        localStorage.setItem('auth_token', token.value)
        
        // Set default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
        
        return { success: true, user: user.value }
      } else {
        throw new Error(response.data.message || 'Login failed')
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Login failed'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    try {
      isLoading.value = true
      error.value = null

      const response = await axios.post('/api/auth/register', userData)
      
      if (response.data.success) {
        token.value = response.data.token
        user.value = response.data.user
        
        localStorage.setItem('auth_token', token.value)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
        
        return { success: true, user: user.value }
      } else {
        throw new Error(response.data.message || 'Registration failed')
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Registration failed'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        await axios.post('/api/auth/logout')
      }
    } catch (err) {
      console.warn('Logout request failed:', err.message)
    } finally {
      // Clear local state regardless of API response
      user.value = null
      token.value = null
      error.value = null
      
      localStorage.removeItem('auth_token')
      delete axios.defaults.headers.common['Authorization']
    }
  }

  const fetchUser = async () => {
    if (!token.value) return

    try {
      isLoading.value = true
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      
      const response = await axios.get('/api/auth/me')
      
      if (response.data.success) {
        user.value = response.data.user
      } else {
        await logout()
      }
    } catch (err) {
      console.error('Failed to fetch user:', err.message)
      await logout()
    } finally {
      isLoading.value = false
    }
  }

  const updateProfile = async (profileData) => {
    try {
      isLoading.value = true
      error.value = null

      const response = await axios.put('/api/auth/profile', profileData)
      
      if (response.data.success) {
        user.value = { ...user.value, ...response.data.user }
        return { success: