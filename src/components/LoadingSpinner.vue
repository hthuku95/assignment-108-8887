<template>
  <div class="loading-spinner-container" :class="{ 'overlay': overlay }">
    <div class="spinner-wrapper">
      <div class="spinner-border" :class="spinnerClass" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p v-if="message" class="loading-message mt-2 mb-0">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].includes(value)
    },
    message: {
      type: String,
      default: ''
    },
    overlay: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    spinnerClass() {
      const classes = [`text-${this.variant}`];
      
      if (this.size === 'sm') {
        classes.push('spinner-border-sm');
      } else if (this.size === 'lg') {
        classes.push('spinner-border-lg');
      }
      
      return classes.join(' ');
    }
  }
};
</script>

<style scoped>
.loading-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}

.loading-spinner-container.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
  min-height: 100vh;
}

.spinner-wrapper {
  text-align: center;
}

.loading-message {
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 500;
}

.spinner-border-lg {
  width: 3rem;
  height: 3rem;
}

@media (max-width: 768px) {
  .loading-message {
    font-size: 0.8rem;
  }
  
  .spinner-border-lg {
    width: 2.5rem;
    height: 2.5rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>