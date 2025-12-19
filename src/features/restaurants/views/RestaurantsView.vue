<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRestaurantsStore } from '../stores/restaurants.store'
import { useAuthStore } from '../../auth/stores/auth.store'

const router = useRouter()
const restaurantsStore = useRestaurantsStore()
const authStore = useAuthStore()

onMounted(async () => {
  await restaurantsStore.fetchAll()
})

const handleRestaurantClick = (restaurantId: string) => {
  router.push(`/restaurants/${restaurantId}`)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Restaurantes
          </h1>
          <p class="text-gray-600">Descubre los mejores restaurantes</p>
        </div>
        <button
          v-if="authStore.isOwner"
          @click="router.push('/restaurants/create')"
          class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          ➕ Crear Restaurante
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="restaurantsStore.isLoading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
        <p class="text-gray-600 font-medium">Cargando restaurantes...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="restaurantsStore.error" class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-6">
        <div class="flex items-center">
          <span class="text-2xl mr-3">⚠️</span>
          <p class="text-red-800 font-medium">{{ restaurantsStore.error }}</p>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="restaurantsStore.restaurants.length === 0"
        class="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100"
      >
        <div class="text-6xl mb-4">🍽️</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">No hay restaurantes disponibles</h3>
        <p class="text-gray-600 mb-6">Sé el primero en agregar un restaurante</p>
        <button
          v-if="authStore.isOwner"
          @click="router.push('/restaurants/create')"
          class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Crear Primer Restaurante
        </button>
      </div>

      <!-- Restaurants Grid -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="restaurant in restaurantsStore.restaurants"
          :key="restaurant.id"
          @click="handleRestaurantClick(restaurant.id)"
          class="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100"
        >
          <!-- Image -->
          <div v-if="restaurant.logoUrl" class="h-56 bg-gradient-to-br from-indigo-100 to-purple-100 relative overflow-hidden">
            <img :src="restaurant.logoUrl" :alt="restaurant.name" class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <div v-else class="h-56 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span class="text-6xl">🍽️</span>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {{ restaurant.name }}
            </h3>
            <p v-if="restaurant.description" class="text-gray-600 text-sm mb-4 line-clamp-2">
              {{ restaurant.description }}
            </p>
            <div class="flex flex-wrap items-center gap-3 text-sm">
              <span v-if="restaurant.address" class="flex items-center gap-1 text-gray-500">
                <span>📍</span>
                <span class="truncate max-w-[200px]">{{ restaurant.address }}</span>
              </span>
              <span v-if="restaurant.hasDelivery" class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                <span>🚚</span>
                Delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

