import { apiClient } from '../../../services/api-client'
import type {
  Reservation,
  CreateReservationRequest,
  UpdateReservationStatusRequest,
} from '../types'

export const reservationsService = {
  async create(data: CreateReservationRequest) {
    return apiClient.post<Reservation>('/reservas/crear', data)
  },

  async getById(reservationId: string, restaurantId: string) {
    return apiClient.get<Reservation>(`/reservas/${reservationId}/${restaurantId}`)
  },

  async updateStatus(data: UpdateReservationStatusRequest) {
    return apiClient.put<Reservation>('/reservas/actualizar-estado', data)
  },
}

