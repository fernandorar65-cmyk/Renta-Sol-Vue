import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { reservationsService } from '../services/reservations.service'
import type { Reservation, CreateReservationRequest, UpdateReservationStatusRequest } from '../types'

export const useReservationsStore = defineStore('reservations', () => {
  const reservations = ref<Reservation[]>([])
  const currentReservation = ref<Reservation | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const reservationsCount = computed(() => reservations.value.length)

  const pendingReservations = computed(() =>
    reservations.value.filter(r => r.status === 'pendiente')
  )

  const confirmedReservations = computed(() =>
    reservations.value.filter(r => r.status === 'confirmada')
  )

  async function create(data: CreateReservationRequest) {
    try {
      isLoading.value = true
      error.value = null

      const response = await reservationsService.create(data)

      if (response.success && response.data) {
        reservations.value.push(response.data)
        return { success: true, data: response.data }
      }

      error.value = response.message || 'Error al crear reserva'
      return { success: false, error: error.value }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function fetchById(reservationId: string, restaurantId: string) {
    try {
      isLoading.value = true
      error.value = null

      const response = await reservationsService.getById(reservationId, restaurantId)

      if (response.success && response.data) {
        currentReservation.value = response.data
        return { success: true, data: response.data }
      }

      error.value = response.message || 'Error al cargar reserva'
      return { success: false, error: error.value }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function updateStatus(data: UpdateReservationStatusRequest) {
    try {
      isLoading.value = true
      error.value = null

      const response = await reservationsService.updateStatus(data)

      if (response.success && response.data) {
        const index = reservations.value.findIndex(r => r.id === data.reservationId)
        if (index !== -1) {
          reservations.value[index] = response.data
        }
        if (currentReservation.value?.id === data.reservationId) {
          currentReservation.value = response.data
        }
        return { success: true, data: response.data }
      }

      error.value = response.message || 'Error al actualizar estado'
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

  function setCurrentReservation(reservation: Reservation | null) {
    currentReservation.value = reservation
  }

  return {
    reservations,
    currentReservation,
    isLoading,
    error,
    reservationsCount,
    pendingReservations,
    confirmedReservations,
    create,
    fetchById,
    updateStatus,
    clearError,
    setCurrentReservation,
  }
})

