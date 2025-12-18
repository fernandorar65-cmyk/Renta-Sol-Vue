# 🍽️ RentaSol Vue - Frontend

Frontend del sistema de gestión de restaurantes RentaSol, desarrollado con Vue 3, TypeScript, Pinia y Vue Router.

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Backend RentaSol ejecutándose en `http://localhost:7071`

### Instalación

```bash
# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env.example .env

# Editar .env y configurar la URL de la API
# VITE_API_BASE_URL=http://localhost:7071/api/v1
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build

```bash
npm run build
```

## 📁 Estructura del Proyecto

El proyecto sigue una arquitectura basada en features:

```
src/
├── features/           # Features organizados por dominio
│   ├── auth/          # Autenticación
│   ├── restaurants/   # Restaurantes
│   ├── reservations/  # Reservas
│   └── dashboard/     # Dashboard
├── components/        # Componentes compartidos
├── services/          # Servicios globales (API client)
├── stores/           # Configuración de Pinia
├── router/           # Configuración de Vue Router
└── types/            # Tipos TypeScript globales
```

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para más detalles.

## 🛠️ Tecnologías

- **Vue 3** - Framework frontend
- **TypeScript** - Type safety
- **Pinia** - Manejo de estado
- **Vue Router** - Routing
- **Axios** - Cliente HTTP
- **Vite** - Build tool

## 📚 Features Implementadas

- ✅ Autenticación (Login/Registro)
- ✅ Gestión de Restaurantes
- ✅ Gestión de Reservas
- ✅ Dashboard principal
- ✅ Protección de rutas
- ✅ Manejo de estado con Pinia
- ✅ Cliente HTTP configurado con interceptores

## 🔗 Integración con Backend

El frontend se conecta al backend de .NET mediante la API REST. Asegúrate de que:

1. El backend esté ejecutándose en `http://localhost:7071`
2. La variable `VITE_API_BASE_URL` en `.env` apunte a la URL correcta
3. El backend tenga CORS configurado para permitir peticiones del frontend

## 📝 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Previsualiza build de producción

## 🏗️ Arquitectura

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para detalles completos sobre la arquitectura del proyecto.

## 📄 Licencia

Privada - Todos los derechos reservados.
