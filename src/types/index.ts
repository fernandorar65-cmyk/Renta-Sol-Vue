export type UserType = 1 | 2 | 3 // ADMINISTRATOR | OWNER_BUSSINES | CUSTOMER

export type UserRole = 'ADMINISTRATOR' | 'OWNER_BUSSINES' | 'CUSTOMER'

export type ReservationStatus = 'pendiente' | 'confirmada' | 'completada' | 'cancelada'

export type PaymentMethod = 'transferencia' | 'efectivo' | 'tarjeta'

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

