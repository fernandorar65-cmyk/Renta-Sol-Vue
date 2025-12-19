import { apiClient } from '../../../services/api-client'
import { API_ENDPOINTS } from '../../../constants'
import type { Restaurant, CreateRestaurantRequest, DinningTable, CreateDinningTableRequest } from '../types'

export const restaurantsService = {
  async getAll() {
    return apiClient.get<Restaurant[]>(API_ENDPOINTS.RESTAURANTS.BASE)
  },

  async getByUserId(userId: string) {
    return apiClient.get<Restaurant>(API_ENDPOINTS.RESTAURANTS.BY_USER(userId))
  },

  async getById(id: string) {
    return apiClient.get<Restaurant>(API_ENDPOINTS.RESTAURANTS.BY_ID(id))
  },

  async create(data: CreateRestaurantRequest) {
    return apiClient.post<Restaurant>(API_ENDPOINTS.RESTAURANTS.CREATE, data)
  },

  async createTable(data: CreateDinningTableRequest) {
    return apiClient.post<DinningTable>(API_ENDPOINTS.RESTAURANTS.CREATE_TABLE, data)
  },
}

