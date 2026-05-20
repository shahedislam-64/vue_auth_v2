import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: '/login',
    },

    {
      path: '/login',
      name: 'loginView',
      component: () => import('../views/loginView.vue'),
      meta: { guest: true },
    },

    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },

    {
      path: '/register',
      name: 'registerView',
      component: () => import('../views/registerView.vue'),
      meta: { guest: true },
    },

    {
      path: '/dashboard',
      name: 'dashboardView',
      component: () => import('../views/dashboardView.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/student',
      name: 'studentView',
      component: () => import('../views/studentView.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/staff',
      name: 'staffView',
      component: () => import('../views/staffView.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/account/dashboard',
      name: 'AccountDashboard',
      component: () => import('@/views/account/AccountDeshboardView.vue'),
    },
    {
      path: '/payment/history',
      name: 'PaymentHistory',
      component: () => import('@/views/account/PaymentHistoryView.vue'),
    },
    {
      path: '/student/payment',
      name: 'StudentPayment',
      component: () => import('@/views/account/StudentPaymentView.vue'),
    },
    {
      path: '/dash-page',
      name: 'dashPageView',
      component: () => import('../views/dashPageView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// Route Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  // Login ছাড়া protected route block
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  // Login থাকলে login/register block
  if (to.meta.guest && token) {
    return next('/dashboard')
  }

  next()
})

export default router
