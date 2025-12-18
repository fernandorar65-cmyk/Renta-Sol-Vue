<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../features/auth/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <router-link to="/dashboard" class="text-2xl font-bold text-gray-900">
            RentaSol
          </router-link>
          <nav class="flex items-center gap-6">
            <router-link
              to="/restaurants"
              class="text-gray-700 hover:text-gray-900"
              active-class="text-indigo-600 font-semibold"
            >
              Restaurantes
            </router-link>
            <router-link
              to="/reservations"
              class="text-gray-700 hover:text-gray-900"
              active-class="text-indigo-600 font-semibold"
            >
              Reservas
            </router-link>
            <div v-if="authStore.user" class="flex items-center gap-4">
              <span class="text-gray-700">{{ authStore.user.name }}</span>
              <button
                @click="handleLogout"
                class="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                Cerrar Sesión
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>

