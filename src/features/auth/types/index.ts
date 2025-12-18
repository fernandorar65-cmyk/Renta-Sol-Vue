export interface User {
  id: string
  email: string
  name: string
  userType: 1 | 2 | 3
  createdAt?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  userType: 1 | 2 | 3
}

export interface AuthResponse {
  token: string
  user: User
}

