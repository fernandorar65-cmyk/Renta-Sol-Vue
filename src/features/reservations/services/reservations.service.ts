import { apiClient } from '../../../services/api-client'
import { API_ENDPOINTS } from '../../../constants'
import type {
  Reservation,
  CreateReservationRequest,
  UpdateReservationStatusRequest,
} from '../types'

export const reservationsService = {
  async create(data: CreateReservationRequest) {
    return apiClient.post<Reservation>(API_ENDPOINTS.RESERVATIONS.CREATE, data)
  },

  async getById(reservationId: string, restaurantId: string) {
    return apiClient.get<Reservation>(
      API_ENDPOINTS.RESERVATIONS.BY_ID(reservationId, restaurantId)
    )
  },

  async updateStatus(data: UpdateReservationStatusRequest) {
    return apiClient.put<Reservation>(API_ENDPOINTS.RESERVATIONS.UPDATE_STATUS, data)
  },
}

