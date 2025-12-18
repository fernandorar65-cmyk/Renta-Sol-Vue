import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/auth.service'
import type { User, LoginRequest, RegisterRequest } from '../types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const userType = computed(() => user.value?.userType ?? null)

  const isAdmin = computed(() => user.value?.userType === 1)
  const isOwner = computed(() => user.value?.userType === 2)
  const isCustomer = computed(() => user.value?.userType === 3)

  async function login(credentials: LoginRequest) {
    try {
      isLoading.value = true
      error.value = null

      const response = await authService.login(credentials)

      if (response.success && response.data) {
        token.value = response.data.token
        user.value = response.data.user
        localStorage.setItem('auth_token', response.data.token)
        return { success: true }
      }

      error.value = response.message || 'Error al iniciar sesión'
      return { success: false, error: error.value }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function register(data: RegisterRequest) {
    try {
      isLoading.value = true
      error.value = null

      const response = await authService.register(data)

      if (response.success && response.data) {
        token.value = response.data.token
        user.value = response.data.user
        localStorage.setItem('auth_token', response.data.token)
        return { success: true }
      }

      error.value = response.message || 'Error al registrar usuario'
      return { success: false, error: error.value }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
  }

  function clearError() {
    error.value = null
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    userType,
    isAdmin,
    isOwner,
    isCustomer,
    login,
    register,
    logout,
    clearError,
  }
})

