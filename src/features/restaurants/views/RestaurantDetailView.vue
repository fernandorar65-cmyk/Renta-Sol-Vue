<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRestaurantsStore } from '../stores/restaurants.store'

const route = useRoute()
const restaurantsStore = useRestaurantsStore()

const restaurantId = computed(() => route.params.id as string)

onMounted(async () => {
  // Intentar obtener desde el store primero (si ya está cargado)
  const existingRestaurant = restaurantsStore.restaurants.find(r => r.id === restaurantId.value)
  if (existingRestaurant) {
    restaurantsStore.setCurrentRestaurant(existingRestaurant)
    return
  }

  // Si no está en el store, intentar cargar por ID directamente
  // Nota: Esto requiere que el backend tenga un endpoint GET /restaurantes/:id
  // Por ahora, cargamos todos (mejorar cuando el endpoint esté disponible)
  await restaurantsStore.fetchAll()
  const restaurant = restaurantsStore.restaurants.find(r => r.id === restaurantId.value)
  if (restaurant) {
    restaurantsStore.setCurrentRestaurant(restaurant)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="restaurantsStore.isLoading" class="text-center py-12">
        <p class="text-gray-500">Cargando restaurante...</p>
      </div>

      <div v-else-if="!restaurantsStore.currentRestaurant" class="text-center py-12">
        <p class="text-gray-500">Restaurante no encontrado</p>
      </div>

      <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
        <div v-if="restaurantsStore.currentRestaurant.logoUrl" class="h-64 bg-gray-200">
          <img
            :src="restaurantsStore.currentRestaurant.logoUrl"
            :alt="restaurantsStore.currentRestaurant.name"
            class="h-full w-full object-cover"
          />
        </div>
        <div v-else class="h-64 bg-gray-200 flex items-center justify-center">
          <span class="text-gray-400 text-6xl">🍽️</span>
        </div>

        <div class="p-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            {{ restaurantsStore.currentRestaurant.name }}
          </h1>

          <p v-if="restaurantsStore.currentRestaurant.description" class="text-gray-600 mb-6">
            {{ restaurantsStore.currentRestaurant.description }}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div v-if="restaurantsStore.currentRestaurant.address">
              <h3 class="font-semibold text-gray-900 mb-2">📍 Dirección</h3>
              <p class="text-gray-600">{{ restaurantsStore.currentRestaurant.address }}</p>
            </div>

            <div v-if="restaurantsStore.currentRestaurant.phone">
              <h3 class="font-semibold text-gray-900 mb-2">📞 Teléfono</h3>
              <p class="text-gray-600">{{ restaurantsStore.currentRestaurant.phone }}</p>
            </div>

            <div v-if="restaurantsStore.currentRestaurant.openingHours">
              <h3 class="font-semibold text-gray-900 mb-2">🕐 Horarios</h3>
              <p class="text-gray-600">{{ restaurantsStore.currentRestaurant.openingHours }}</p>
            </div>

            <div v-if="restaurantsStore.currentRestaurant.hasDelivery">
              <h3 class="font-semibold text-gray-900 mb-2">🚚 Delivery</h3>
              <p class="text-green-600">Disponible</p>
            </div>
          </div>

          <div class="mt-8">
            <router-link
              :to="`/reservations/create?restaurantId=${restaurantId}`"
              class="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Hacer Reserva
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

