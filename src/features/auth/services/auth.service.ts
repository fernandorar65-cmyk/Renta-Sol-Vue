import { apiClient } from '../../../services/api-client'
import { API_ENDPOINTS } from '../../../constants'
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types'

export const authService = {
  async login(credentials: LoginRequest) {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials)
  },

  async register(data: RegisterRequest) {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data)
  },

  async getUsers() {
    return apiClient.get(API_ENDPOINTS.AUTH.USERS)
  },
}

