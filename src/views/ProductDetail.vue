<template>
  <div class="container-fluid">
    <div v-if="loading" class="d-flex justify-content-center align-items-center" style="min-height: 400px;">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="product" class="row py-4">
      <!-- Product Images -->
      <div class="col-lg-6 col-md-12 mb-4">
        <div class="product-images">
          <div class="main-image mb-3">
            <img 
              :src="selectedImage || product.image" 
              :alt="product.name" 
              class="img-fluid rounded shadow-sm w-100"
              style="max-height: 500px; object-fit: cover;"
            />
          </div>
          <div v-if="product.gallery && product.gallery.length > 0" class="thumbnail-images">
            <div class="row g-2">
              <div 
                v-for="(image, index) in product.gallery" 
                :key="index" 
                class="col-3"
              >
                <img 
                  :src="image" 
                  :alt="`${product.name} ${index + 1}`"
                  class="img-thumbnail cursor-pointer"
                  :class="{ 'border-primary': selectedImage === image }"
                  @click="selectedImage = image"
                  style="height: 80px; object-fit: cover;"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Details -->
      <div class="col-lg-6 col-md-12">
        <div class="product-details">
          <nav aria-label="breadcrumb" class="mb-3">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-decoration-none">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/products" class="text-decoration-none">Products</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{ product.name }}</li>
            </ol>
          </nav>

          <h1 class="h2 mb-3">{{ product.name }}</h1>
          
          <div class="d-flex align-items-center mb-3">
            <div class="rating me-3">
              <span v-for="star in 5" :key="star" class="text-warning">
                <i :class="star <= product.rating ? 'fas fa-star' : 'far fa-star'"></i>
              </span>
              <span class="ms-2 text-muted">({{ product.reviews || 0 }} reviews)</span>
            </div>
            <span v-if="product.inStock" class="badge bg-success">In Stock</span>
            <span v-else class="badge bg-danger">Out of Stock</span>
          </div>

          <div class="price mb-4">
            <span v-if="product.originalPrice" class="text-muted text-decoration-line-through me-2">
              ${{ product.originalPrice.toFixed(2) }}
            </span>
            <span class="h3 text-primary fw-bold">${{ product.price.toFixed(2) }}</span>
            <span v-if="product.originalPrice" class="badge bg-danger ms-2">
              {{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}% OFF
            </span>
          </div>

          <div class="product-description mb-4">
            <h5>Description</h5>
            <p class="text-muted">{{ product.description }}</p>
          </div>

          <div v-if="product.specifications" class="specifications mb-