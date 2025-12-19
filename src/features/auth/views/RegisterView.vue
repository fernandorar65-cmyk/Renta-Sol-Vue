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
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
          <span class="text-3xl">🍽️</span>
        </div>
        <h2 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          RentaSol
        </h2>
        <p class="mt-2 text-gray-600 font-medium">
          Crea tu cuenta y comienza
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                Nombre completo
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">👤</span>
                </div>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  placeholder="Tu nombre completo"
                />
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">📧</span>
                </div>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">🔒</span>
                </div>
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>

            <div>
              <label for="userType" class="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de usuario
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">👥</span>
                </div>
                <select
                  id="userType"
                  v-model="form.userType"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none appearance-none"
                >
                  <option v-for="type in userTypes" :key="type.value" :value="type.value">
                    {{ type.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div v-if="authStore.error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p class="text-red-700 text-sm font-medium">{{ authStore.error }}</p>
          </div>

          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3.5 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="authStore.isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registrando...
            </span>
            <span v-else>Crear Cuenta</span>
          </button>

          <div class="text-center pt-4">
            <p class="text-sm text-gray-600">
              ¿Ya tienes cuenta?
              <router-link
                to="/login"
                class="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
              >
                Inicia sesión aquí
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

