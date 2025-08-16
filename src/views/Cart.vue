<template>
  <div class="cart-page">
    <div class="container py-4">
      <div class="row">
        <div class="col-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-decoration-none">Home</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Shopping Cart</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <h1 class="h2 mb-4">
            <i class="fas fa-shopping-cart me-2"></i>
            Shopping Cart
            <span class="badge bg-primary ms-2" v-if="cartItems.length > 0">
              {{ cartItems.length }}
            </span>
          </h1>
        </div>
      </div>

      <div v-if="cartItems.length === 0" class="row">
        <div class="col-12">
          <div class="text-center py-5">
            <div class="mb-4">
              <i class="fas fa-shopping-cart fa-5x text-muted"></i>
            </div>
            <h3 class="text-muted mb-3">Your cart is empty</h3>
            <p class="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
            <router-link to="/products" class="btn btn-primary btn-lg">
              <i class="fas fa-arrow-left me-2"></i>
              Continue Shopping
            </router-link>
          </div>
        </div>
      </div>

      <div v-else class="row">
        <div class="col-lg-8">
          <div class="card shadow-sm">
            <div class="card-header bg-white">
              <h5 class="card-title mb-0">Cart Items</h5>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col" class="text-center">Quantity</th>
                      <th scope="col" class="text-end">Price</th>
                      <th scope="col" class="text-end">Total</th>
                      <th scope="col" class="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cartItems" :key="item.id" class="align-middle">
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="flex-shrink-0 me-3">
                            <img 
                              :src="item.image" 
                              :alt="item.name" 
                              class="img-thumbnail"
                              style="width: 80px; height: 80px; object-fit: cover;"
                            >
                          </div>
                          <div class="flex-grow-1">
                            <h6 class="mb-1">{{ item.name }}</h6>
                            <small class="text-muted">{{ item.category }}</small>
                            <div v-if="item.selectedSize" class="small text-muted">
                              Size: {{ item.selectedSize }}
                            </div>
                            <div v-if="item.selectedColor" class="small text-muted">
                              Color: {{ item.selectedColor }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div class="input-group input-group-sm" style="width: 120px; margin: 0 auto;">