<template>
  <div class="card h-100 product-card" @click="viewProduct">
    <div class="position-relative">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="card-img-top product-image"
        @error="handleImageError"
      />
      <div class="position-absolute top-0 end-0 p-2">
        <button 
          class="btn btn-outline-light btn-sm rounded-circle wishlist-btn"
          @click.stop="toggleWishlist"
          :class="{ 'btn-danger': isInWishlist, 'text-danger': isInWishlist }"
        >
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div v-if="product.discount" class="position-absolute top-0 start-0 p-2">
        <span class="badge bg-danger">{{ product.discount }}% OFF</span>
      </div>
    </div>
    
    <div class="card-body d-flex flex-column">
      <h5 class="card-title product-title">{{ product.name }}</h5>
      <p class="card-text text-muted small flex-grow-1">{{ truncatedDescription }}</p>
      
      <div class="mb-2">
        <div class="d-flex align-items-center mb-1">
          <div class="rating me-2">
            <span v-for="n in 5" :key="n" class="star">
              <i 
                :class="n <= product.rating ? 'fas fa-star text-warning' : 'far fa-star text-muted'"
              ></i>
            </span>
          </div>
          <small class="text-muted">({{ product.reviewCount || 0 }})</small>
        </div>
      </div>
      
      <div class="price-section mb-3">
        <div class="d-flex align-items-center">
          <span class="h5 mb-0 text-primary me-2">${{ discountedPrice }}</span>
          <span v-if="product.discount" class="text-muted text-decoration-line-through small">
            ${{ product.price }}
          </span>
        </div>
      </div>
      
      <div class="d-flex gap-2 mt-auto">
        <button 
          class="btn btn-primary flex-grow-1"
          @click.stop="addToCart"
          :disabled="!product.inStock"
        >
          <i class="fas fa-shopping-cart me-1"></i>
          {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
        </button>
        <button 
          class="btn btn-outline-secondary"
          @click.stop="quickView"
        >
          <i class="fas fa-eye"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
      validator(product) {
        return product && 
               typeof product.id !== 'undefined' &&
               typeof product.name === 'string' &&
               typeof product.price === 'number'
      }
    }
  },
  data() {
    return {
      isInWishlist: false,
      imageError: false
    }
  },
  computed: {
    truncatedDescription() {
      if (!this.product.description) return ''
      return this.product.description.length > 100 
        ? this.product.description.substring(0, 100) + '...'
        : this.product.description
    },
    discountedPrice() {
      if (this.product.discount) {
        const discount = this.product.discount / 100
        return (this.product.price * (1 - discount)).toFixed(2)
      }
      return this.product.price.to