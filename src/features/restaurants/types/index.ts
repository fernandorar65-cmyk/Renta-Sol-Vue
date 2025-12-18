export interface Restaurant {
  id: string
  userId: string
  name: string
  description?: string
  address?: string
  phone?: string
  latitude?: number
  longitude?: number
  logoUrl?: string
  hasDelivery?: boolean
  openingHours?: string
  createdAt?: string
}

export interface CreateRestaurantRequest {
  name: string
  description?: string
  address?: string
  phone?: string
  latitude?: number
  longitude?: number
  hasDelivery?: boolean
  openingHours?: string
}

export interface DinningTable {
  id: string
  restaurantId: string
  capacity: number
  isAvailable: boolean
}

export interface CreateDinningTableRequest {
  restaurantId: string
  capacity: number
}

