<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { UserType } from '../../../constants'
import type { RegisterRequest } from '../types'

const router = useRouter()
const authStore = useAuthStore()

const form = ref<RegisterRequest>({
  email: '',
  password: '',
  name: '',
  userType: UserType.CUSTOMER, // CUSTOMER por defecto
})

const userTypes = [
  { value: UserType.ADMINISTRATOR, label: 'Administrador' },
  { value: UserType.OWNER_BUSSINES, label: 'Propietario de Negocio' },
  { value: UserType.CUSTOMER, label: 'Cliente' },
]

const handleSubmit = async () => {
  const result = await authStore.register(form.value)
  if (result.success) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crear Cuenta
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Regístrate en RentaSol
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Nombre completo
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div>
            <label for="userType" class="block text-sm font-medium text-gray-700">
              Tipo de usuario
            </label>
            <select
              id="userType"
              v-model="form.userType"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option v-for="type in userTypes" :key="type.value" :value="type.value">
                {{ type.label }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="authStore.error" class="text-red-600 text-sm text-center">
          {{ authStore.error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="authStore.isLoading">Registrando...</span>
            <span v-else>Registrarse</span>
          </button>
        </div>

        <div class="text-center">
          <router-link
            to="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

