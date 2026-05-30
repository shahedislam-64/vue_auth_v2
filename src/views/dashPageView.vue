<template>
  <!-- MOBILE HEADER -->
  <div class="mobile-header d-md-none">
    <button class="menu-btn" @click="toggleSidebar">☰</button>

    <h5 class="mb-0 text-white">Admin Panel</h5>
  </div>

  <!-- OVERLAY -->
  <div class="sidebar-overlay" :class="{ active: isSidebarOpen }" @click="toggleSidebar"></div>

  <!-- SIDEBAR -->
  <div class="sidebar" :class="{ active: isSidebarOpen }">
    <h4 class="text-white mb-4">Admin Panel</h4>

    <router-link to="/dashboard" active-class="active-menu" @click="closeSidebar">
      Dashboard
    </router-link>

    <router-link
      v-if="role === 'Manager' || role === 'Admin'"
      to="/staff"
      active-class="active-menu"
      @click="closeSidebar"
    >
      Staff
    </router-link>

    <router-link to="/account/dashboard" class="text-white d-block ph" @click="closeSidebar">
      Account Dashboard
    </router-link>

    <!-- STUDENT DROPDOWN -->
    <div class="dropdown bgc w-100">
      <button
        class="btn btn-secondary dropdown-toggle student-btn"
        type="button"
        data-bs-toggle="dropdown"
      >
        Students
      </button>

      <ul class="dropdown-menu w-100">
        <li>
          <router-link
            class="dropdown-item"
            to="/student"
            active-class="active-menu"
            @click="closeSidebar"
          >
            All Students
          </router-link>
        </li>

        <li>
          <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#addModal">
            Add Student
          </button>
        </li>
      </ul>
    </div>

    <a href="#">Settings</a>

    <button @click="logout" class="btn btn-danger w-100 mt-4">Logout</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const role = localStorage.getItem('role')
const router = useRouter()

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')

  router.push('/login')
}
</script>

<style scoped>
/* DESKTOP SIDEBAR */
.sidebar {
  width: 250px;
  min-height: 100vh;
  background: #111827;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  z-index: 999;
  transition: 0.3s ease;
}

.sidebar a {
  display: block;
  color: white;
  text-decoration: none;
  padding: 12px 15px;
  margin-bottom: 8px;
  border-radius: 8px;
  transition: 0.3s;
}

.sidebar a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.active-menu {
  background: #2563eb;
}

.student-btn {
  width: 100%;
  background: transparent !important;
  border: none !important;
  text-align: left;
  padding: 12px 15px;
}

/* MOBILE TOPBAR */
.mobile-header {
  position: sticky;
  top: 0;
  z-index: 998;
  background: #111827;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.menu-btn {
  border: none;
  background: transparent;
  color: white;
  font-size: 30px;
  line-height: 1;
}

/* OVERLAY */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  z-index: 997;
}

.sidebar-overlay.active {
  visibility: visible;
  opacity: 1;
}

/* MOBILE */
@media (max-width: 768px) {
  .sidebar {
    left: -100%;
    width: 260px;
  }

  .sidebar.active {
    left: 0;
  }
}

/* DESKTOP */
@media (min-width: 769px) {
  .mobile-header {
    display: none;
  }
}
.dropdown-menu {
  background-color: #111827 !important;
}
</style>
