<template>
  <div class="cart-item border-bottom py-3">
    <div class="row align-items-center">
      <div class="col-md-2 col-3">
        <img 
          :src="item.image" 
          :alt="item.name" 
          class="img-fluid rounded"
          style="max-height: 80px; object-fit: cover;"
        >
      </div>
      
      <div class="col-md-4 col-9">
        <h6 class="mb-1">{{ item.name }}</h6>
        <p class="text-muted small mb-0">{{ item.category }}</p>
        <p class="text-success fw-bold mb-0">${{ item.price.toFixed(2) }}</p>
      </div>
      
      <div class="col-md-3 col-12 mt-2 mt-md-0">
        <div class="d-flex align-items-center justify-content-center">
          <button 
            class="btn btn-outline-secondary btn-sm"
            @click="decreaseQuantity"
            :disabled="item.quantity <= 1"
          >
            <i class="fas fa-minus"></i>
          </button>
          
          <input 
            type="number" 
            class="form-control text-center mx-2" 
            style="width: 60px;"
            :value="item.quantity"
            @input="updateQuantity($event.target.value)"
            min="1"
            :max="item.stock"
          >
          
          <button 
            class="btn btn-outline-secondary btn-sm"
            @click="increaseQuantity"
            :disabled="item.quantity >= item.stock"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
        
        <div class="text-center mt-1">
          <small class="text-muted">Stock: {{ item.stock }}</small>
        </div>
      </div>
      
      <div class="col-md-2 col-8 mt-2 mt-md-0">
        <p class="fw-bold text-primary mb-0 text-center">
          ${{ (item.price * item.quantity).toFixed(2) }}
        </p>
      </div>
      
      <div class="col-md-1 col-4 mt-2 mt-md-0 text-end">
        <button 
          class="btn btn-outline-danger btn-sm"
          @click="removeFromCart"
          title="Remove item"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
    
    <div v-if="item.quantity > item.stock" class="row mt-2">
      <div class="col-12">
        <div class="alert alert-warning alert-sm py-2 mb-0">
          <small>
            <i class="fas fa-exclamation-triangle"></i>
            Only {{ item.stock }} items available in stock
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true,
      validator(value) {
        return value.id && value.name && value.price !== undefined && value.quantity !== undefined;
      }
    }
  },
  emits: ['update-quantity', 'remove-item'],
  methods: {
    increaseQuantity() {
      if (this.item.quantity < this.item.stock) {
        this.updateQuantity(this.item.quantity + 1);
      }
    },
    
    decreaseQuantity() {
      if (this.item.quantity > 1) {
        this.updateQuantity(this.item.quantity - 1);
      }
    },
    
    updateQuantity(newQuantity) {
      const quantity = parseInt(newQuantity);