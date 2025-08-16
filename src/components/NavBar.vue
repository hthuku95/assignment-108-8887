<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">
        <i class="fas fa-store me-2"></i>
        ShopVue
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact-active-class="active">
              <i class="fas fa-home me-1"></i>
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products" active-class="active">
              <i class="fas fa-box me-1"></i>
              Products
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-tags me-1"></i>
              Categories
            </a>
            <ul class="dropdown-menu">
              <li v-for="category in categories" :key="category.id">
                <router-link
                  class="dropdown-item"
                  :to="`/products?category=${category.slug}`"
                >
                  {{ category.name }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>

        <div class="d-flex align-items-center">
          <form class="d-flex me-3" @submit.prevent="handleSearch">
            <div class="input-group">
              <input
                class="form-control"
                type="search"
                placeholder="Search products..."
                aria-label="Search"
                v-model="searchQuery"
                style="min-width: 200px"
              />
              <button class="btn btn-outline-light" type="submit">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </form>

          <div class="navbar-nav d-flex flex-row">
            <router-link
              class="nav-link me-3 position-relative"
              to="/cart"
              active-class="active"
            >
              <i class="fas fa-shopping-cart fs-5"></i>
              <span
                v-if="cartItemCount > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ cartItemCount }}
                <span class="visually-hidden">items in cart</span>
              </span>
            </router-link>

            <div class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fas fa-user me-1"></i>
                {{ user ? user.name : 'Account' }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li v-if="!user">
                  <router-link class="dropdown-item" to="/login">
                    <i class="fas fa-sign-in-alt me-2"></i>
                    Login
                  </router-link>
                </li>
                <li v-if="!user">
                  <router-link class="dropdown-item" to="/register">
                    <i class="fas fa-user