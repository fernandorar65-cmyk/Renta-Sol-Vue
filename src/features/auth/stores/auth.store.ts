import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth.service'
import { storageService } from '../../../services/storage.service'
import { useErrorHandler } from '../../../composables/useErrorHandler'
import { STORAGE_KEYS } from '../../../constants'
import type { User, LoginRequest, RegisterRequest } from '../types'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const { error, handleApiError, handleException, clearError: clearErrorHandler } = useErrorHandler()

  const user = ref<User | null>(null)
  const token = ref<string | null>(storageService.getItem(STORAGE_KEYS.AUTH_TOKEN))
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const userType = computed(() => user.value?.userType ?? null)

  const isAdmin = computed(() => user.value?.userType === 1)
  const isOwner = computed(() => user.value?.userType === 2)
  const isCustomer = computed(() => user.value?.userType === 3)

  async function login(credentials: LoginRequest) {
    try {
      isLoading.value = true
      clearErrorHandler()

      const response = await authService.login(credentials)

      if (response.success && response.data) {
        token.value = response.data.token
        user.value = response.data.user
        storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token)
        return { success: true }
      }

      const errorMessage = handleApiError(response, 'Error al iniciar sesión')
      return { success: false, error: errorMessage }
    } catch (err: unknown) {
      const errorMessage = handleException(err, 'Error desconocido al iniciar sesión')
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  async function register(data: RegisterRequest) {
    try {
      isLoading.value = true
      clearErrorHandler()

      const response = await authService.register(data)

      if (response.success && response.data) {
        token.value = response.data.token
        user.value = response.data.user
        storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token)
        return { success: true }
      }

      const errorMessage = handleApiError(response, 'Error al registrar usuario')
      return { success: false, error: errorMessage }
    } catch (err: unknown) {
      const errorMessage = handleException(err, 'Error desconocido al registrar usuario')
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    storageService.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    router.push('/login')
  }

  function clearError() {
    clearErrorHandler()
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

