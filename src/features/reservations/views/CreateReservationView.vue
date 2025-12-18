<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useReservationsStore } from '../stores/reservations.store'
import { useRestaurantsStore } from '../../restaurants/stores/restaurants.store'
import type { CreateReservationRequest } from '../types'

const router = useRouter()
const route = useRoute()
const reservationsStore = useReservationsStore()
const restaurantsStore = useRestaurantsStore()

const form = ref<CreateReservationRequest>({
  restaurantId: (route.query.restaurantId as string) || '',
  tableId: '',
  reservationDate: '',
  reservationTime: '',
  numberOfPeople: 2,
  amountPaid: 0,
})

onMounted(async () => {
  await restaurantsStore.fetchAll()
})

const handleSubmit = async () => {
  const result = await reservationsStore.create(form.value)
  if (result.success) {
    router.push('/reservations')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Nueva Reserva</h1>

      <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label for="restaurantId" class="block text-sm font-medium text-gray-700 mb-2">
            Restaurante
          </label>
          <select
            id="restaurantId"
            v-model="form.restaurantId"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Selecciona un restaurante</option>
            <option
              v-for="restaurant in restaurantsStore.restaurants"
              :key="restaurant.id"
              :value="restaurant.id"
            >
              {{ restaurant.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="tableId" class="block text-sm font-medium text-gray-700 mb-2">
            Mesa
          </label>
          <input
            id="tableId"
            v-model="form.tableId"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="ID de la mesa"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="reservationDate" class="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input
              id="reservationDate"
              v-model="form.reservationDate"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label for="reservationTime" class="block text-sm font-medium text-gray-700 mb-2">
              Hora
            </label>
            <input
              id="reservationTime"
              v-model="form.reservationTime"
              type="time"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="numberOfPeople" class="block text-sm font-medium text-gray-700 mb-2">
              Número de Personas
            </label>
            <input
              id="numberOfPeople"
              v-model.number="form.numberOfPeople"
              type="number"
              min="1"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label for="amountPaid" class="block text-sm font-medium text-gray-700 mb-2">
              Monto Abonado
            </label>
            <input
              id="amountPaid"
              v-model.number="form.amountPaid"
              type="number"
              min="0"
              step="0.01"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div v-if="reservationsStore.error" class="bg-red-50 border border-red-200 rounded-md p-4">
          <p class="text-red-800 text-sm">{{ reservationsStore.error }}</p>
        </div>

        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="reservationsStore.isLoading"
            class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="reservationsStore.isLoading">Creando...</span>
            <span v-else>Crear Reserva</span>
          </button>
          <button
            type="button"
            @click="router.back()"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

