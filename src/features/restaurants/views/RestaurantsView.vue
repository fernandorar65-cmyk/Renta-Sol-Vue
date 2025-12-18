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
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Restaurantes</h1>
        <button
          v-if="authStore.isOwner"
          @click="router.push('/restaurants/create')"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Crear Restaurante
        </button>
      </div>

      <div v-if="restaurantsStore.isLoading" class="text-center py-12">
        <p class="text-gray-500">Cargando restaurantes...</p>
      </div>

      <div v-else-if="restaurantsStore.error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
        <p class="text-red-800">{{ restaurantsStore.error }}</p>
      </div>

      <div
        v-else-if="restaurantsStore.restaurants.length === 0"
        class="text-center py-12"
      >
        <p class="text-gray-500">No hay restaurantes disponibles</p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="restaurant in restaurantsStore.restaurants"
          :key="restaurant.id"
          @click="handleRestaurantClick(restaurant.id)"
          class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div v-if="restaurant.logoUrl" class="h-48 bg-gray-200 flex items-center justify-center">
            <img :src="restaurant.logoUrl" :alt="restaurant.name" class="h-full w-full object-cover" />
          </div>
          <div v-else class="h-48 bg-gray-200 flex items-center justify-center">
            <span class="text-gray-400 text-4xl">🍽️</span>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ restaurant.name }}</h3>
            <p v-if="restaurant.description" class="text-gray-600 text-sm mb-4 line-clamp-2">
              {{ restaurant.description }}
            </p>
            <div class="flex items-center text-sm text-gray-500">
              <span v-if="restaurant.address" class="mr-4">📍 {{ restaurant.address }}</span>
              <span v-if="restaurant.hasDelivery" class="text-green-600">🚚 Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

