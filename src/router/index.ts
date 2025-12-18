import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../features/auth/views/LoginView.vue'),
    // meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../features/auth/views/RegisterView.vue'),
    // meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../features/dashboard/views/DashboardView.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: () => import('../features/restaurants/views/RestaurantsView.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/restaurants/:id',
    name: 'restaurant-detail',
    component: () => import('../features/restaurants/views/RestaurantDetailView.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: () => import('../features/reservations/views/ReservationsView.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/reservations/create',
    name: 'create-reservation',
    component: () => import('../features/reservations/views/CreateReservationView.vue'),
    // meta: { requiresAuth: true },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard para proteger rutas
// router.beforeEach((to, _from, next) => {
//   const token = localStorage.getItem('auth_token')
//   const requiresAuth = to.meta.requiresAuth

//   if (requiresAuth && !token) {
//     next({ name: 'login' })
//   } else if (!requiresAuth && token && (to.name === 'login' || to.name === 'register')) {
//     next({ name: 'dashboard' })
//   } else {
//     next()
//   }
// })

