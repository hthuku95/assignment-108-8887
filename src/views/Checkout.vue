<template>
  <div class="checkout-container">
    <div class="container mt-4">
      <div class="row">
        <div class="col-lg-8">
          <div class="card">
            <div class="card-header">
              <h4 class="mb-0">Checkout</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="processCheckout" novalidate>
                <!-- Billing Information -->
                <div class="mb-4">
                  <h5 class="border-bottom pb-2">Billing Information</h5>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="firstName" class="form-label">First Name *</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors.firstName }"
                        id="firstName"
                        v-model="billingInfo.firstName"
                        @blur="validateField('firstName')"
                        required
                      >
                      <div v-if="errors.firstName" class="invalid-feedback">
                        {{ errors.firstName }}
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="lastName" class="form-label">Last Name *</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors.lastName }"
                        id="lastName"
                        v-model="billingInfo.lastName"
                        @blur="validateField('lastName')"
                        required
                      >
                      <div v-if="errors.lastName" class="invalid-feedback">
                        {{ errors.lastName }}
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email Address *</label>
                    <input
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': errors.email }"
                      id="email"
                      v-model="billingInfo.email"
                      @blur="validateField('email')"
                      required
                    >
                    <div v-if="errors.email" class="invalid-feedback">
                      {{ errors.email }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="phone" class="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      class="form-control"
                      :class="{ 'is-invalid': errors.phone }"
                      id="phone"
                      v-model="billingInfo.phone"
                      @blur="validateField('phone')"
                      required
                    >
                    <div v-if="errors.phone" class="invalid-feedback">
                      {{ errors.phone }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="address" class="form-label">Address *</label>
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors.address }"
                      id="address"
                      v-model="billingInfo.address"
                      @blur="validateField('address')"
                      required
                    >
                    <div v-if="errors.address" class="invalid-feedback">
                      {{ errors.address }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="city" class="form-label">City *</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors.city }"
                        id="city"
                        v