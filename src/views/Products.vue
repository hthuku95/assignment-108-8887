<template>
  <div class="container-fluid py-4">
    <!-- Page Header -->
    <div class="row mb-4">
      <div class="col-12">
        <h1 class="display-4 text-center mb-3">Our Products</h1>
        <p class="lead text-center text-muted">Discover our amazing collection of products</p>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="row g-3">
              <!-- Search -->
              <div class="col-md-4">
                <label for="searchInput" class="form-label">Search Products</label>
                <input
                  id="searchInput"
                  type="text"
                  class="form-control"
                  placeholder="Search by name..."
                  v-model="filters.search"
                  @input="applyFilters"
                >
              </div>

              <!-- Category Filter -->
              <div class="col-md-3">
                <label for="categorySelect" class="form-label">Category</label>
                <select
                  id="categorySelect"
                  class="form-select"
                  v-model="filters.category"
                  @change="applyFilters"
                >
                  <option value="">All Categories</option>
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>

              <!-- Price Range -->
              <div class="col-md-3">
                <label for="priceRange" class="form-label">Max Price: ${{ filters.maxPrice }}</label>
                <input
                  id="priceRange"
                  type="range"
                  class="form-range"
                  min="0"
                  max="1000"
                  v-model="filters.maxPrice"
                  @input="applyFilters"
                >
              </div>

              <!-- Sort By -->
              <div class="col-md-2">
                <label for="sortSelect" class="form-label">Sort By</label>
                <select
                  id="sortSelect"
                  class="form-select"
                  v-model="filters.sortBy"
                  @change="applyFilters"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            <!-- Clear Filters -->
            <div class="row mt-3">
              <div class="col-12">
                <button class="btn btn-outline-secondary" @click="clearFilters">
                  <i class="bi bi-arrow-clockwise"></i> Clear Filters
                </button>
                <span class="ms-3 text-muted">{{ filteredProducts.length }} products found</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading products...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      <h4 class="alert-heading">Error Loading Products</h4>
      <p>{{ error }}</p>
      <button class="btn btn-outline-danger" @click="fetchProducts">
        <i class="bi bi-arrow-clockwise"></i> Retry
      </button>
    </div>

    <!-- Products Grid -->
    <div