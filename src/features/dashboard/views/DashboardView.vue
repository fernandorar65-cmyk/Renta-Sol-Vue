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
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-xl">🍽️</span>
            </div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              RentaSol
            </h1>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-lg">
              <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {{ authStore.user?.name?.charAt(0).toUpperCase() }}
              </div>
              <span v-if="authStore.user" class="text-sm font-medium text-gray-700">
                {{ authStore.user.name }}
              </span>
            </div>
            <button
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">
          ¡Bienvenido, <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{{ authStore.user?.name }}</span>!
        </h2>
        <p class="text-gray-600">Gestiona tu restaurante de manera eficiente</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium mb-1">Restaurantes</p>
              <p class="text-4xl font-bold">{{ restaurantsStore.restaurantsCount }}</p>
            </div>
            <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span class="text-3xl">🍽️</span>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium mb-1">Reservas Totales</p>
              <p class="text-4xl font-bold">{{ reservationsStore.reservationsCount }}</p>
            </div>
            <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span class="text-3xl">📅</span>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium mb-1">Reservas Pendientes</p>
              <p class="text-4xl font-bold">{{ reservationsStore.pendingReservations.length }}</p>
            </div>
            <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span class="text-3xl">⏳</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <router-link
          to="/restaurants"
          class="group bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100"
        >
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span class="text-2xl">🍽️</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Restaurantes</h3>
          <p class="text-sm text-gray-600">Ver todos los restaurantes</p>
        </router-link>

        <router-link
          to="/reservations"
          class="group bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100"
        >
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span class="text-2xl">📅</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Reservas</h3>
          <p class="text-sm text-gray-600">Gestionar reservas</p>
        </router-link>

        <router-link
          to="/reservations/create"
          class="group bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100"
        >
          <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span class="text-2xl">➕</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Nueva Reserva</h3>
          <p class="text-sm text-gray-600">Crear una nueva reserva</p>
        </router-link>

        <div
          v-if="authStore.isOwner"
          class="group bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100 cursor-pointer"
        >
          <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span class="text-2xl">🏪</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Mi Restaurante</h3>
          <p class="text-sm text-gray-600">Gestionar mi negocio</p>
        </div>
      </div>

      <!-- Recent Restaurants -->
      <div v-if="restaurantsStore.restaurants.length > 0" class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 class="text-xl font-bold text-gray-900 mb-6">Restaurantes Recientes</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="restaurant in restaurantsStore.restaurants.slice(0, 3)"
            :key="restaurant.id"
            @click="router.push(`/restaurants/${restaurant.id}`)"
            class="group border-2 border-gray-200 rounded-xl p-5 hover:border-indigo-500 hover:shadow-lg cursor-pointer transition-all transform hover:scale-105"
          >
            <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span class="text-2xl">🍽️</span>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">{{ restaurant.name }}</h4>
            <p v-if="restaurant.description" class="text-sm text-gray-600 line-clamp-2">
              {{ restaurant.description }}
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

