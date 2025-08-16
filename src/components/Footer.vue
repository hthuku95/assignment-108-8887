<template>
  <footer class="bg-dark text-light py-5 mt-auto">
    <div class="container">
      <div class="row">
        <!-- Company Info -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h5 class="text-uppercase fw-bold mb-3">ShopVue</h5>
          <p class="text-muted">
            Your trusted online shopping destination for quality products at great prices.
          </p>
          <div class="d-flex gap-3">
            <a href="#" class="text-light" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="text-light" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="text-light" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="text-light" aria-label="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-6 mb-4">
          <h6 class="text-uppercase fw-bold mb-3">Quick Links</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/" class="text-muted text-decoration-none">
                Home
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/products" class="text-muted text-decoration-none">
                Products
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/categories" class="text-muted text-decoration-none">
                Categories
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/about" class="text-muted text-decoration-none">
                About Us
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div class="col-lg-2 col-md-6 mb-4">
          <h6 class="text-uppercase fw-bold mb-3">Customer Service</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/contact" class="text-muted text-decoration-none">
                Contact Us
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/shipping" class="text-muted text-decoration-none">
                Shipping Info
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/returns" class="text-muted text-decoration-none">
                Returns
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/faq" class="text-muted text-decoration-none">
                FAQ
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Account -->
        <div class="col-lg-2 col-md-6 mb-4">
          <h6 class="text-uppercase fw-bold mb-3">Account</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/login" class="text-muted text-decoration-none">
                Sign In
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/register" class="text-muted text-decoration-none">
                Register
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/profile" class="text-muted text-decoration-none">
                My Account
              </router-