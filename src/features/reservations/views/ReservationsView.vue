<script setup lang="ts">
import { onMounted } from 'vue'
import { useReservationsStore } from '../stores/reservations.store'
// import { useAuthStore } from '../../auth/stores/auth.store'

const reservationsStore = useReservationsStore()
// const authStore = useAuthStore()

onMounted(() => {
  // Aquí podrías cargar las reservas del usuario actual
  // Por ahora mostramos un estado vacío
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Mis Reservas
          </h1>
          <p class="text-gray-600">Gestiona todas tus reservas</p>
        </div>
        <router-link
          to="/reservations/create"
          class="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          ➕ Nueva Reserva
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-if="reservationsStore.isLoading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mb-4"></div>
        <p class="text-gray-600 font-medium">Cargando reservas...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="reservationsStore.error" class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-6">
        <div class="flex items-center">
          <span class="text-2xl mr-3">⚠️</span>
          <p class="text-red-800 font-medium">{{ reservationsStore.error }}</p>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="reservationsStore.reservations.length === 0"
        class="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100"
      >
        <div class="text-6xl mb-4">📅</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">No tienes reservas aún</h3>
        <p class="text-gray-600 mb-6">Crea tu primera reserva y comienza a disfrutar</p>
        <router-link
          to="/reservations/create"
          class="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Crear Primera Reserva
        </router-link>
      </div>

      <!-- Reservations List -->
      <div v-else class="space-y-4">
        <div
          v-for="reservation in reservationsStore.reservations"
          :key="reservation.id"
          class="group bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all transform hover:scale-[1.02]"
        >
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <span class="text-2xl">📅</span>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900">
                    Reserva #{{ reservation.id.slice(0, 8) }}
                  </h3>
                  <p class="text-sm text-gray-500">ID: {{ reservation.id }}</p>
                </div>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div class="flex items-center gap-2">
                  <span class="text-xl">📅</span>
                  <div>
                    <p class="text-xs text-gray-500">Fecha</p>
                    <p class="text-sm font-semibold text-gray-900">{{ reservation.reservationDate }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xl">🕐</span>
                  <div>
                    <p class="text-xs text-gray-500">Hora</p>
                    <p class="text-sm font-semibold text-gray-900">{{ reservation.reservationTime }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xl">👥</span>
                  <div>
                    <p class="text-xs text-gray-500">Personas</p>
                    <p class="text-sm font-semibold text-gray-900">{{ reservation.numberOfPeople }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xl">💵</span>
                  <div>
                    <p class="text-xs text-gray-500">Monto</p>
                    <p class="text-sm font-semibold text-gray-900">${{ reservation.amountPaid }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-shrink-0">
              <span
                :class="{
                  'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white': reservation.status === 'pendiente',
                  'bg-gradient-to-r from-green-400 to-green-500 text-white': reservation.status === 'confirmada',
                  'bg-gradient-to-r from-gray-400 to-gray-500 text-white': reservation.status === 'completada',
                  'bg-gradient-to-r from-red-400 to-red-500 text-white': reservation.status === 'cancelada',
                }"
                class="inline-block px-4 py-2 rounded-xl text-sm font-bold capitalize shadow-md"
              >
                {{ reservation.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

