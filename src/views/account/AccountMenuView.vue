<template>
  <div>
    <!-- Mobile Topbar -->
    <div class="mobile-topbar d-md-none d-flex align-items-center p-2 bg-dark text-white">
      <button class="btn btn-outline-light btn-sm me-2" @click="toggleMenu">☰</button>

      <h5 class="m-0">School Panel</h5>
    </div>

    <!-- Sidebar / Dropdown Menu -->
    <div :class="['sidebar bg-dark text-white p-3', { open: isOpen }]">
      <h4 class="d-none d-md-block">School Panel</h4>
      <hr class="d-none d-md-block" />

      <router-link to="/account/dashboard" class="text-white d-block mb-2"> Dashboard </router-link>

      <router-link to="/student/payment" class="text-white d-block mb-2">
        Student Payment
      </router-link>

      <router-link to="/payment/history" class="text-white d-block mb-2">
        Payment History
      </router-link>

      <router-link to="/dashboard" class="text-white d-block mb-2"> Main Dashboard </router-link>

      <button @click="logout" class="btn btn-danger w-100 logout-btn mt-3">Logout</button>
    </div>

    <!-- Overlay (mobile only) -->
    <div v-if="isOpen" class="overlay d-md-none" @click="toggleMenu"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/login')
  isOpen.value = false
}
</script>
<style scoped>
.sidebar {
  width: 250px;
  min-height: 100vh;
}

/* Desktop fixed */
@media (min-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
  }
}

/* Mobile: overlay only (NOT affecting layout width) */
@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: -260px;
    height: 100vh;
    transition: 0.3s;
    z-index: 1000;
  }

  .sidebar.open {
    left: 0;
  }
}
</style>
