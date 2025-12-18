import { apiClient } from '../../../services/api-client'
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types'

export const authService = {
  async login(credentials: LoginRequest) {
    return apiClient.post<AuthResponse>('/usuarios/login', credentials)
  },

  async register(data: RegisterRequest) {
    return apiClient.post<AuthResponse>('/usuarios/crear', data)
  },

  async getUsers() {
    return apiClient.get('/usuarios')
  },
}

