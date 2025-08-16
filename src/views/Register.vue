<template>
  <div class="register-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow-lg border-0 rounded-lg mt-5">
            <div class="card-header">
              <h3 class="text-center font-weight-light my-4">Create Account</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleRegister">
                <div class="form-floating mb-3">
                  <input
                    v-model="form.firstName"
                    class="form-control"
                    :class="{ 'is-invalid': errors.firstName }"
                    id="inputFirstName"
                    type="text"
                    placeholder="Enter your first name"
                    required
                  />
                  <label for="inputFirstName">First Name</label>
                  <div v-if="errors.firstName" class="invalid-feedback">
                    {{ errors.firstName }}
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <input
                    v-model="form.lastName"
                    class="form-control"
                    :class="{ 'is-invalid': errors.lastName }"
                    id="inputLastName"
                    type="text"
                    placeholder="Enter your last name"
                    required
                  />
                  <label for="inputLastName">Last Name</label>
                  <div v-if="errors.lastName" class="invalid-feedback">
                    {{ errors.lastName }}
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <input
                    v-model="form.email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                    id="inputEmail"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                  <label for="inputEmail">Email address</label>
                  <div v-if="errors.email" class="invalid-feedback">
                    {{ errors.email }}
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <input
                    v-model="form.password"
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                    id="inputPassword"
                    type="password"
                    placeholder="Create a password"
                    required
                  />
                  <label for="inputPassword">Password</label>
                  <div v-if="errors.password" class="invalid-feedback">
                    {{ errors.password }}
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <input
                    v-model="form.confirmPassword"
                    class="form-control"
                    :class="{ 'is-invalid': errors.confirmPassword }"
                    id="inputPasswordConfirm"
                    type="password"
                    placeholder="Confirm password"
                    required
                  />
                  <label for="inputPasswordConfirm">Confirm Password</label>
                  <div v-if="errors.confirmPassword" class="invalid-feedback">
                    {{ errors.confirmPassword }}
                  </div>
                </div>
                <div class="form-check mb-3">
                  <input
                    v-model="form.agreeToTerms"
                    class="form-check-input"
                    :class="{ 'is-invalid': errors.agreeToTerms }"
                    id="inputRememberPassword"
                    type="checkbox"
                    required
                  />
                  <label class="form-check-label" for="inputRememberPassword">
                    I agree to the <a href="#" class="text-primary">Terms and Conditions</a>
                  </label>
                  <div v-if="errors.agreeToTerms" class="invalid-feedback