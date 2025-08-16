<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/">
          <i class="fas fa-shopping-bag me-2"></i>
          EcoShop
        </router-link>
        
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">Products</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/categories">Categories</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">Contact</router-link>
            </li>
          </ul>
          
          <ul class="navbar-nav">
            <li class="nav-item dropdown" v-if="isAuthenticated">
              <a 
                class="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                <i class="fas fa-user me-1"></i>
                {{ user.name }}
              </a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
                <li><router-link class="dropdown-item" to="/orders">My Orders</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
              </ul>
            </li>
            <li class="nav-item" v-else>
              <router-link class="nav-link" to="/login">
                <i class="fas fa-sign-in-alt me-1"></i>
                Login
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link position-relative" to="/cart">
                <i class="fas fa-shopping-cart"></i>
                <span 
                  v-if="cartItemCount > 0" 
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >
                  {{ cartItemCount }}
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="bg-dark text-light py-5 mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h5 class="mb-3">
              <i class="fas fa-shopping-bag me-2"></i>
              EcoShop
            </h5>
            <p class="text-muted">
              Your trusted online shopping destination for quality products at affordable prices.
            </p>
            <div class="d-flex gap-3">
              <a href="#" class="text-light">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="text-light">
                <i class="fab fa-twitter"></i>
              </a>