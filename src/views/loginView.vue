<template>
  <div
    class="d-flex align-items-center justify-content-center vh-100"
    style="background: linear-gradient(135deg, #0f172a, #2563eb)"
  >
    <div class="card form-card shadow-lg" style="max-width: 900px">
      <div class="row g-0">
        <div class="col-lg-5 left-side d-none d-lg-block">
          <h1>Welcome Back</h1>
          <p>Professional Admin Dashboard Login</p>
        </div>
        <div class="col-lg-7 bg-white p-5">
          <h2 class="fw-bold mb-4">Login</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label>Email</label>
              <input v-model="email" type="email" class="form-control" />
            </div>
            <div class="mb-3">
              <label>Password</label>
              <input v-model="password" type="password" class="form-control" />
            </div>
            <button class="btn btn-custom w-100">Login</button>
            <p class="mt-3 text-center">
              No account? <router-link to="/register">Register</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
const router = useRouter()

const email = ref('')
const password = ref('')

const login = async () => {
  try {
    const res = await api.post('/login', {
      email: email.value,
      password: password.value,
    })

    localStorage.setItem('token', res.data.token)
    localStorage.setItem('role', res.data.staff.role)

    router.push('/dashboard')
  } catch (error) {
    console.log(error.response?.data)
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
