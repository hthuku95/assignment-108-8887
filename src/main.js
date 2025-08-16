import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import App from './App.vue'

// Import components
import Home from './components/Home.vue'
import ProductList from './components/ProductList.vue'
import ProductDetail from './components/ProductDetail.vue'
import Cart from './components/Cart.vue'
import Checkout from './components/Checkout.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Profile from './components/Profile.vue'

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Router configuration
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: ProductList },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail, props: true },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/profile', name: 'Profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Vuex store configuration
const store = createStore({
  state: {
    user: null,
    cart: [],
    products: [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
        image: 'https://via.placeholder.com/300x300/007bff/ffffff?text=Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        category: 'Electronics',
        stock: 50
      },
      {
        id: 2,
        name: 'Smartphone',
        price: 699.99,
        image: 'https://via.placeholder.com/300x300/28a745/ffffff?text=Smartphone',
        description: 'Latest smartphone with advanced features',
        category: 'Electronics',
        stock: 30
      },
      {
        id: 3,
        name: 'Running Shoes',
        price: 129.99,
        image: 'https://via.placeholder.com/300x300/dc3545/ffffff?text=Shoes',
        description: 'Comfortable running shoes for all terrains',
        category: 'Sports',
        stock: 25
      },
      {
        id: 4,
        name: 'Coffee Maker',
        price: 79.99,
        image: 'https://via.placeholder.com/300x300/ffc107/000000?text=Coffee+Maker',
        description: 'Automatic coffee maker with timer',
        category: 'Home',
        stock: 15
      },
      {
        id: 5,
        name: 'Laptop Backpack',
        price: 49.99,
        image: 'https://via.placeholder.com/300x300/6f42c1/ffffff?text=Backpack',
        description: 'Durable laptop backpack with multiple compartments',
        category: 'Accessories',
        stock: 40
      },
      {
        id: 6,
        name: 'Gaming Mouse',
        price: 59.99,
        image: 'https://via.placeholder.com/300x300/20c997/ffffff?text=Gaming+Mouse',
        description: 'High-precision gaming mouse with RGB lighting',
        category: 'Electronics',
        stock: 35
      }
    ],
    categories: ['All', 'Electronics', 'Sports', 'Home', 'Accessories'],
    orders: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    LOGOUT_USER