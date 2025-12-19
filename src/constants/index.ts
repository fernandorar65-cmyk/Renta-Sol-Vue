// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
} as const

// User types
export enum UserType {
  ADMINISTRATOR = 1,
  OWNER_BUSSINES = 2,
  CUSTOMER = 3,
}

// Reservation statuses
export enum ReservationStatus {
  PENDIENTE = 'pendiente',
  CONFIRMADA = 'confirmada',
  COMPLETADA = 'completada',
  CANCELADA = 'cancelada',
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}


// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/usuarios/login',
    REGISTER: '/usuarios/crear',
    USERS: '/usuarios',
  },
  RESTAURANTS: {
    BASE: '/restaurantes',
    CREATE: '/restaurantes/crear',
    BY_USER: (userId: string) => `/restaurantes/${userId}`,
    BY_ID: (id: string) => `/restaurantes/${id}`,
    CREATE_TABLE: '/restaurantes/dinning-table/crear',
  },
  RESERVATIONS: {
    BASE: '/reservas',
    CREATE: '/reservas/crear',
    BY_ID: (reservationId: string, restaurantId: string) =>
      `/reservas/${reservationId}/${restaurantId}`,
    UPDATE_STATUS: '/reservas/actualizar-estado',
  },
} as const

