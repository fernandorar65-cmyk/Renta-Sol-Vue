import { ref } from 'vue'
import type { ApiResponse } from '../types'

export interface ErrorHandlerOptions {
  showNotification?: boolean
  logError?: boolean
}

export function useErrorHandler() {
  const error = ref<string | null>(null)
  const errors = ref<string[]>([])

  function handleApiError(
    response: ApiResponse<unknown>,
    defaultMessage = 'Ha ocurrido un error'
  ): string {
    const errorMessage = response.message || defaultMessage
    const errorList = response.errors || []

    error.value = errorMessage
    errors.value = errorList

    if (errorList.length > 0) {
      console.error('API Errors:', errorList)
    }

    return errorMessage
  }

  function handleException(err: unknown, defaultMessage = 'Error desconocido'): string {
    const errorMessage = err instanceof Error ? err.message : defaultMessage
    error.value = errorMessage
    console.error('Exception:', err)
    return errorMessage
  }

  function clearError() {
    error.value = null
    errors.value = []
  }

  return {
    error,
    errors,
    handleApiError,
    handleException,
    clearError,
  }
}

