<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../auth/stores/auth.store'
import { useRestaurantsStore } from '../../restaurants/stores/restaurants.store'
import { useReservationsStore } from '../../reservations/stores/reservations.store'

const router = useRouter()
const authStore = useAuthStore()
const restaurantsStore = useRestaurantsStore()
const reservationsStore = useReservationsStore()

onMounted(async () => {
  await restaurantsStore.fetchAll()
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">RentaSol</h1>
          <div class="flex items-center gap-4">
            <span v-if="authStore.user" class="text-gray-700">
              {{ authStore.user.name }}
            </span>
            <button
              @click="handleLogout"
              class="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">Bienvenido, {{ authStore.user?.name }}</h2>
        <p class="text-gray-600">Gestiona tu restaurante de manera eficiente</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500 mb-2">Restaurantes</h3>
          <p class="text-3xl font-bold text-gray-900">{{ restaurantsStore.restaurantsCount }}</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500 mb-2">Reservas Totales</h3>
          <p class="text-3xl font-bold text-gray-900">{{ reservationsStore.reservationsCount }}</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500 mb-2">Reservas Pendientes</h3>
          <p class="text-3xl font-bold text-gray-900">{{ reservationsStore.pendingReservations.length }}</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <router-link
          to="/restaurants"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-2">🍽️ Restaurantes</h3>
          <p class="text-sm text-gray-600">Ver todos los restaurantes</p>
        </router-link>

        <router-link
          to="/reservations"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-2">📅 Reservas</h3>
          <p class="text-sm text-gray-600">Gestionar reservas</p>
        </router-link>

        <router-link
          to="/reservations/create"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-2">➕ Nueva Reserva</h3>
          <p class="text-sm text-gray-600">Crear una nueva reserva</p>
        </router-link>

        <div
          v-if="authStore.isOwner"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-2">🏪 Mi Restaurante</h3>
          <p class="text-sm text-gray-600">Gestionar mi negocio</p>
        </div>
      </div>

      <!-- Recent Restaurants -->
      <div v-if="restaurantsStore.restaurants.length > 0" class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Restaurantes Recientes</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="restaurant in restaurantsStore.restaurants.slice(0, 3)"
            :key="restaurant.id"
            @click="router.push(`/restaurants/${restaurant.id}`)"
            class="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 cursor-pointer transition-colors"
          >
            <h4 class="font-semibold text-gray-900 mb-2">{{ restaurant.name }}</h4>
            <p v-if="restaurant.description" class="text-sm text-gray-600 line-clamp-2">
              {{ restaurant.description }}
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

