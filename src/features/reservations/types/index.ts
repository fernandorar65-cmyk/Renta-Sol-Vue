import type { ReservationStatus } from '../../../types'

export interface Reservation {
  id: string
  restaurantId: string
  userId: string
  tableId: string
  reservationDate: string
  reservationTime: string
  numberOfPeople: number
  amountPaid: number
  status: ReservationStatus
  createdAt?: string
}

export interface CreateReservationRequest {
  restaurantId: string
  tableId: string
  reservationDate: string
  reservationTime: string
  numberOfPeople: number
  amountPaid: number
}

export interface UpdateReservationStatusRequest {
  reservationId: string
  restaurantId: string
  status: ReservationStatus
}

