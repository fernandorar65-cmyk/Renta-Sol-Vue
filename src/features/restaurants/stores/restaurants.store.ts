import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { restaurantsService } from '../services/restaurants.service'
import { useErrorHandler } from '../../../composables/useErrorHandler'
import type { Restaurant, CreateRestaurantRequest } from '../types'

export const useRestaurantsStore = defineStore('restaurants', () => {
  const { error, handleApiError, handleException, clearError: clearErrorHandler } = useErrorHandler()

  const restaurants = ref<Restaurant[]>([])
  const currentRestaurant = ref<Restaurant | null>(null)
  const isLoading = ref(false)

  const restaurantsCount = computed(() => restaurants.value.length)

  async function fetchAll() {
    try {
      isLoading.value = true
      clearErrorHandler()

      const response = await restaurantsService.getAll()

      if (response.success && response.data) {
        restaurants.value = Array.isArray(response.data) ? response.data : [response.data]
        return { success: true }
      }

      const errorMessage = handleApiError(response, 'Error al cargar restaurantes')
      return { success: false, error: errorMessage }
    } catch (err: unknown) {
      const errorMessage = handleException(err, 'Error desconocido al cargar restaurantes')
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  async function fetchByUserId(userId: string) {
    try {
      isLoading.value = true
      clearErrorHandler()

      const response = await restaurantsService.getByUserId(userId)

      if (response.success && response.data) {
        currentRestaurant.value = response.data
        return { success: true, data: response.data }
      }

      const errorMessage = handleApiError(response, 'Error al cargar restaurante')
      return { success: false, error: errorMessage }
    } catch (err: unknown) {
      const errorMessage = handleException(err, 'Error desconocido al cargar restaurante')
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  async function create(data: CreateRestaurantRequest) {
    try {
      isLoading.value = true
      clearErrorHandler()

      const response = await restaurantsService.create(data)

      if (response.success && response.data) {
        restaurants.value.push(response.data)
        return { success: true, data: response.data }
      }

      const errorMessage = handleApiError(response, 'Error al crear restaurante')
      return { success: false, error: errorMessage }
    } catch (err: unknown) {
      const errorMessage = handleException(err, 'Error desconocido al crear restaurante')
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    clearErrorHandler()
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

