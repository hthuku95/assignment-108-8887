import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

class ProductService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Request interceptor for authentication
    this.apiClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Get all products with optional filters
  async getAllProducts(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.category) queryParams.append('category', params.category);
      if (params.minPrice) queryParams.append('minPrice', params.minPrice);
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
      if (params.search) queryParams.append('search', params.search);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);

      const response = await this.apiClient.get(`/products?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  }

  // Get product by ID
  async getProductById(productId) {
    try {
      if (!productId) {
        throw new Error('Product ID is required');
      }

      const response = await this.apiClient.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
  }

  // Get products by category
  async getProductsByCategory(categoryId, params = {}) {
    try {
      if (!categoryId) {
        throw new Error('Category ID is required');
      }

      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const response = await this.apiClient.get(`/products/category/${categoryId}?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch products by category');
    }
  }

  // Search products
  async searchProducts(searchTerm, params = {}) {
    try {
      if (!searchTerm) {
        throw new Error('Search term is required');
      }

      const queryParams = new URLSearchParams();
      queryParams.append('q', searchTerm);
      if (params.category) queryParams.append('category', params.category);
      if (params.minPrice) query