// Tipos globales compartidos en toda la aplicación
// Nota: UserType y ReservationStatus están definidos como objetos const en src/constants/index.ts

/**
 * Estructura estándar de respuesta del API
 * @template T - Tipo de datos de la respuesta
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

/**
 * Métodos de pago disponibles
 */
export type PaymentMethod = 'transferencia' | 'efectivo' | 'tarjeta'

