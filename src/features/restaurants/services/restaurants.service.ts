import { apiClient } from '../../../services/api-client'
import type { Restaurant, CreateRestaurantRequest, DinningTable, CreateDinningTableRequest } from '../types'

export const restaurantsService = {
  async getAll() {
    return apiClient.get<Restaurant[]>('/restaurantes')
  },

  async getByUserId(userId: string) {
    return apiClient.get<Restaurant>(`/restaurantes/${userId}`)
  },

  async create(data: CreateRestaurantRequest) {
    return apiClient.post<Restaurant>('/restaurantes/crear', data)
  },

  async createTable(data: CreateDinningTableRequest) {
    return apiClient.post<DinningTable>('/restaurantes/dinning-table/crear', data)
  },
}

