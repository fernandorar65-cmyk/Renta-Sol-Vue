// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
} as const

// User types - usando objeto const con tipo
export const UserType = {
  ADMINISTRATOR: 1,
  OWNER_BUSSINES: 2,
  CUSTOMER: 3,
} as const

// Crear un tipo derivado del objeto
export type UserType = typeof UserType[keyof typeof UserType]

// Reservation statuses - usando objeto const con tipo
export const ReservationStatus = {
  PENDIENTE: 'pendiente',
  CONFIRMADA: 'confirmada',
  COMPLETADA: 'completada',
  CANCELADA: 'cancelada',
} as const

// Crear un tipo derivado del objeto
export type ReservationStatus = typeof ReservationStatus[keyof typeof ReservationStatus]

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