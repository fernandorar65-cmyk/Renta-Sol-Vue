import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { restaurantsService } from '../services/restaurants.service'
import type { Restaurant, CreateRestaurantRequest } from '../types'

export const useRestaurantsStore = defineStore('restaurants', () => {
  const restaurants = ref<Restaurant[]>([])
  const currentRestaurant = ref<Restaurant | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const restaurantsCount = computed(() => restaurants.value.length)

  async function fetchAll() {
    try {
      isLoading.value = true
      error.value = null

      const response = await restaurantsService.getAll()

      if (response.success && response.data) {
        restaurants.value = Array.isArray(response.data) ? response.data : [response.data]
        return { success: true }
      }

      error.value = response.message || 'Error al cargar restaurantes'
      return { success: false, error: error.value }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function fetchByUserId(userId: string) {
    try {
      isLoading.value = true
      error.value = null

      const response = await restaurantsService.getByUserId(userId)

      if (response.success && response.data) {
        currentRestaurant.value = response.data
        return { success: true, data: response.data }
      }

      error.value = response.message || 'Error al cargar restaurante'
      return { success: false, error: error.value }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function create(data: CreateRestaurantRequest) {
    try {
      isLoading.value = true
      error.value = null

      const response = await restaurantsService.create(data)

      if (response.success && response.data) {
        restaurants.value.push(response.data)
        return { success: true, data: response.data }
      }

      error.value = response.message || 'Error al crear restaurante'
      return { success: false, error: error.value }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  function setCurrentRestaurant(restaurant: Restaurant | null) {
    currentRestaurant.value = restaurant
  }

  return {
    restaurants,
    currentRestaurant,
    isLoading,
    error,
    restaurantsCount,
    fetchAll,
    fetchByUserId,
    create,
    clearError,
    setCurrentRestaurant,
  }
})

