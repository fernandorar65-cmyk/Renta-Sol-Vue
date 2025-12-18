# 🏗️ Arquitectura del Proyecto RentaSol Vue

Este documento describe la arquitectura y estructura del proyecto frontend de RentaSol.

## 📁 Estructura de Carpetas

```
src/
├── features/              # Features organizados por dominio
│   ├── auth/             # Autenticación y usuarios
│   │   ├── stores/       # Store de Pinia
│   │   ├── services/     # Servicios API
│   │   ├── types/        # Tipos TypeScript
│   │   └── views/        # Vistas del feature
│   ├── restaurants/      # Gestión de restaurantes
│   ├── reservations/     # Gestión de reservas
│   ├── menus/            # Gestión de menús (futuro)
│   ├── payments/         # Gestión de pagos (futuro)
│   └── dashboard/        # Dashboard principal
├── components/           # Componentes compartidos
│   └── shared/          # Componentes reutilizables
├── composables/         # Composables de Vue
├── services/            # Servicios globales
│   └── api-client.ts    # Cliente HTTP configurado
├── stores/              # Configuración de Pinia
├── router/              # Configuración de Vue Router
├── types/               # Tipos globales TypeScript
└── main.ts              # Punto de entrada
```

## 🎯 Principios de Arquitectura

### 1. Feature-Based Structure
Cada feature es independiente y contiene:
- **stores/**: Estado de Pinia específico del feature
- **services/**: Llamadas a la API
- **types/**: Tipos TypeScript del dominio
- **views/**: Vistas/páginas del feature
- **components/**: Componentes específicos del feature (opcional)

### 2. Separación de Responsabilidades
- **Services**: Lógica de comunicación con API
- **Stores**: Estado global y lógica de negocio
- **Views**: Presentación y UI
- **Types**: Contratos y tipos de datos

### 3. Composición sobre Herencia
- Uso de Composition API
- Composables reutilizables
- Stores modulares con Pinia

## 🔧 Tecnologías

- **Vue 3** con Composition API
- **TypeScript** para type safety
- **Pinia** para manejo de estado
- **Vue Router** para routing
- **Axios** para peticiones HTTP
- **Tailwind CSS** para estilos (configurar)

## 📦 Stores de Pinia

Cada store sigue el patrón de Composition API:

```typescript
export const useFeatureStore = defineStore('feature', () => {
  // State
  const data = ref<Type[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const count = computed(() => data.value.length)

  // Actions
  async function fetchData() {
    // Lógica
  }

  return {
    data,
    isLoading,
    error,
    count,
    fetchData,
  }
})
```

## 🌐 Servicios API

Los servicios encapsulan las llamadas a la API:

```typescript
export const featureService = {
  async getAll() {
    return apiClient.get<Type[]>('/endpoint')
  },
  async create(data: CreateRequest) {
    return apiClient.post<Type>('/endpoint', data)
  },
}
```

## 🛣️ Routing

Las rutas están protegidas con guards que verifican autenticación:
- Rutas públicas: `/login`, `/register`
- Rutas protegidas: Requieren token JWT

## 🔐 Autenticación

- Token JWT almacenado en `localStorage`
- Interceptor de Axios agrega token automáticamente
- Redirección automática si token expira

## 📝 Convenciones

- **Nombres de archivos**: PascalCase para componentes, camelCase para servicios
- **Nombres de stores**: `useFeatureStore`
- **Nombres de servicios**: `featureService`
- **Tipos**: Interfaces con sufijo `Request` o `Response` cuando aplica

## 🚀 Próximos Pasos

1. Agregar Tailwind CSS
2. Implementar feature de Menús
3. Implementar feature de Pagos
4. Agregar tests unitarios
5. Implementar manejo de errores global
6. Agregar loading states globales

