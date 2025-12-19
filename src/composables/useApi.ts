import type { ApiResponse } from '../constants/index'

export function useApi<T = unknown>() {
  const handleResponse = (response: ApiResponse<T>) => {
    if (response.success && response.data) {
      return { success: true, data: response.data }
    }
    return {
      success: false,
      error: response.message || 'Error en la petición',
      errors: response.errors,
    }
  }

  return {
    handleResponse,
  }
}

