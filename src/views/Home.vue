<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section bg-primary text-white">
      <div class="container">
        <div class="row align-items-center min-vh-75">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="display-4 fw-bold mb-4">
                Discover Amazing Products
              </h1>
              <p class="lead mb-4">
                Shop the latest trends and find everything you need at unbeatable prices. Quality products, fast shipping, and excellent customer service.
              </p>
              <div class="hero-buttons">
                <router-link to="/products" class="btn btn-light btn-lg me-3">
                  Shop Now
                </router-link>
                <button class="btn btn-outline-light btn-lg" @click="scrollToFeatured">
                  View Featured
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image text-center">
              <img 
                src="/api/placeholder/600/400" 
                alt="Hero Product" 
                class="img-fluid rounded shadow-lg"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="feature-card text-center p-4">
              <div class="feature-icon mb-3">
                <i class="fas fa-shipping-fast fa-3x text-primary"></i>
              </div>
              <h4>Fast Shipping</h4>
              <p class="text-muted">Free shipping on orders over $50. Get your products delivered quickly and safely.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card text-center p-4">
              <div class="feature-icon mb-3">
                <i class="fas fa-shield-alt fa-3x text-success"></i>
              </div>
              <h4>Secure Payment</h4>
              <p class="text-muted">Your payment information is protected with industry-standard encryption.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card text-center p-4">
              <div class="feature-icon mb-3">
                <i class="fas fa-undo fa-3x text-info"></i>
              </div>
              <h4>Easy Returns</h4>
              <p class="text-muted">Not satisfied? Return your purchase within 30 days for a full refund.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section id="featured-products" class="featured-section py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-header text-center mb-5">
              <h2 class="display-5 fw-bold">Featured Products</h2>
              <p class="lead text-muted">Discover our handpicked selection of trending items</p>
            </div>
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <!-- Featured Products Grid -->
        <div v-else class="row">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id"
            class="col-lg-3 col-md-6 mb-4"