<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow-lg border-0">
            <div class="card-body p-5">
              <div class="text-center mb-4">
                <h2 class="card-title text-primary">Welcome Back</h2>
                <p class="text-muted">Sign in to your account</p>
              </div>
              
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                    id="email"
                    v-model="form.email"
                    placeholder="Enter your email"
                    required
                  />
                  <div v-if="errors.email" class="invalid-feedback">
                    {{ errors.email }}
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <div class="input-group">
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      :class="{ 'is-invalid': errors.password }"
                      id="password"
                      v-model="form.password"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="togglePassword"
                    >
                      <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                  <div v-if="errors.password" class="invalid-feedback">
                    {{ errors.password }}
                  </div>
                </div>
                
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="remember"
                    v-model="form.remember"
                  />
                  <label class="form-check-label" for="remember">
                    Remember me
                  </label>
                </div>
                
                <div v-if="loginError" class="alert alert-danger" role="alert">
                  <i class="fas fa-exclamation-triangle me-2"></i>
                  {{ loginError }}
                </div>
                
                <button
                  type="submit"
                  class="btn btn-primary w-100 mb-3"
                  :disabled="isLoading"
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isLoading ? 'Signing In...' : 'Sign In' }}
                </button>
                
                <div class="text-center">
                  <router-link to="/forgot-password" class="text-decoration-none">
                    Forgot your password?
                  </router-link>
                </div>
              </form>
              
              <hr class="my-4">
              
              <div class="text-center">
                <p class="mb-3">Don't have an account?</p>
                <router-link to="/register" class="btn btn-outline-primary w-100">
                  Create Account
                </router-link>
              </div>
              
              <div class="text-center mt-4">
                <div class="mb-3">
                  <small class="text-muted">Or continue with</small>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button type="button" class="btn btn-outline-danger me-md-