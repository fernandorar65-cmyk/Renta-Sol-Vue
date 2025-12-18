<script setup lang="ts">
import { onMounted } from 'vue'
import { useReservationsStore } from '../stores/reservations.store'
import { useAuthStore } from '../../auth/stores/auth.store'

const reservationsStore = useReservationsStore()
const authStore = useAuthStore()

onMounted(() => {
  // Aquí podrías cargar las reservas del usuario actual
  // Por ahora mostramos un estado vacío
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Mis Reservas</h1>
        <router-link
          to="/reservations/create"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Nueva Reserva
        </router-link>
      </div>

      <div v-if="reservationsStore.isLoading" class="text-center py-12">
        <p class="text-gray-500">Cargando reservas...</p>
      </div>

      <div v-else-if="reservationsStore.error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
        <p class="text-red-800">{{ reservationsStore.error }}</p>
      </div>

      <div
        v-else-if="reservationsStore.reservations.length === 0"
        class="text-center py-12 bg-white rounded-lg shadow"
      >
        <p class="text-gray-500 mb-4">No tienes reservas aún</p>
        <router-link
          to="/reservations/create"
          class="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Crear Primera Reserva
        </router-link>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="reservation in reservationsStore.reservations"
          :key="reservation.id"
          class="bg-white rounded-lg shadow-md p-6"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                Reserva #{{ reservation.id.slice(0, 8) }}
              </h3>
              <div class="space-y-1 text-sm text-gray-600">
                <p>📅 Fecha: {{ reservation.reservationDate }}</p>
                <p>🕐 Hora: {{ reservation.reservationTime }}</p>
                <p>👥 Personas: {{ reservation.numberOfPeople }}</p>
                <p>💵 Monto: ${{ reservation.amountPaid }}</p>
              </div>
            </div>
            <div class="text-right">
              <span
                :class="{
                  'bg-yellow-100 text-yellow-800': reservation.status === 'pendiente',
                  'bg-green-100 text-green-800': reservation.status === 'confirmada',
                  'bg-gray-100 text-gray-800': reservation.status === 'completada',
                  'bg-red-100 text-red-800': reservation.status === 'cancelada',
                }"
                class="px-3 py-1 rounded-full text-xs font-semibold capitalize"
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

