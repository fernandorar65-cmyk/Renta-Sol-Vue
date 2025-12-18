# 🍽️ RentaSol - Sistema de Gestión de Restaurantes

**RentaSol** es una plataforma completa de gestión para restaurantes que permite administrar mesas, menús, reservas y pagos de manera eficiente y moderna.

## 📋 Descripción del Proyecto

RentaSol es una API REST desarrollada con **.NET 8.0** y **Azure Functions v4** que ofrece una solución integral para la gestión de restaurantes. El sistema permite a los propietarios de restaurantes gestionar su negocio de manera digital, mientras que los clientes pueden realizar reservas de mesas de forma sencilla.

### 🎯 Funcionalidades Principales

#### 👥 Gestión de Usuarios
- **Registro de usuarios**: Creación de cuentas con diferentes tipos (Administrador, Propietario de Negocio, Cliente)
- **Autenticación**: Login seguro con JWT (JSON Web Tokens)
- **Perfiles de usuario**: Gestión completa de información personal y de negocio
- **Encriptación de contraseñas**: Seguridad implementada con encriptación AES

#### 🏪 Gestión de Restaurantes
- **Creación de restaurantes**: Registro completo con información del negocio
- **Información detallada**: Nombre, descripción, dirección, teléfono, horarios de atención
- **Geolocalización**: Coordenadas GPS (latitud/longitud) para ubicación
- **Logo del negocio**: Almacenamiento de imágenes corporativas
- **Delivery**: Soporte para restaurantes con servicio de entrega a domicilio

#### 🪑 Gestión de Mesas
- **Creación de mesas**: Configuración de mesas por restaurante
- **Gestión de capacidad**: Control de disponibilidad y número de personas

#### 📖 Gestión de Menús
- **Categorías de menú**: Organización de platillos por categorías
- **Platillos**: Gestión completa de productos (nombre, descripción, precio, imágenes)
- **Generación de PDFs**: Creación automática de menús en formato PDF para impresión o visualización
- **Menús digitales**: Acceso web a los menús de cada restaurante

#### 📅 Gestión de Reservas
- **Crear reservas**: Los clientes pueden reservar mesas en restaurantes
- **Control de disponibilidad**: Sistema que verifica disponibilidad de mesas
- **Estados de reserva**: Seguimiento del estado de las reservas (pendiente, confirmada, completada, cancelada)
- **Información de reserva**: Fecha, hora, número de personas, monto abonado

#### 💳 Gestión de Pagos
- **Registro de pagos**: Gestión de pagos asociados a reservas
- **Diferentes métodos**: Soporte para transferencias y otros métodos de pago
- **Seguimiento financiero**: Control de montos y estados de pago

## 🛠️ Tecnologías Utilizadas

- **.NET 8.0**: Framework principal de desarrollo
- **Azure Functions v4**: Hosting serverless y API endpoints
- **Azure Table Storage**: Base de datos NoSQL para persistencia de datos
- **Azure Blob Storage**: Almacenamiento de imágenes y documentos PDF
- **FluentValidation**: Validación robusta de datos de entrada
- **JWT (JSON Web Tokens)**: Autenticación y autorización
- **QuestPDF**: Generación de documentos PDF
- **Swagger/OpenAPI**: Documentación automática de la API
- **xUnit**: Framework de testing unitario

## 📁 Estructura del Proyecto

```
RentaSol.Cloud.Api/
├── Funcion/              # Azure Functions (Endpoints de la API)
│   ├── User.cs          # Endpoints de usuarios
│   ├── Restaurant.cs    # Endpoints de restaurantes
│   ├── Menu.cs          # Endpoints de menús
│   ├── Reservation.cs   # Endpoints de reservas
│   └── Payment.cs       # Endpoints de pagos
│
├── RentaSol.App.Be/     # Business Entities (Entidades y DTOs)
│   ├── Aplicacion/Requests/  # DTOs de entrada
│   ├── Users/Ts/            # Entidades de usuarios
│   ├── Restaurants/Ts/      # Entidades de restaurantes
│   └── Util/                # Utilidades y enums
│
├── RentaSol.App.Bl/     # Business Logic (Lógica de negocio)
│   ├── Users/              # Lógica de usuarios
│   ├── Restaurants/        # Lógica de restaurantes
│   ├── Payments/           # Lógica de pagos
│   ├── Validators/         # Validadores FluentValidation
│   └── QuestPdf/           # Generación de PDFs
│
├── RentaSol.App.Da/     # Data Access (Acceso a datos)
│   ├── Users/Ts/          # Acceso a datos de usuarios
│   ├── Restaurants/Ts/    # Acceso a datos de restaurantes
│   └── Util/              # Utilidades de almacenamiento
│
└── RentaSol.App.Bl.Tests/  # Tests unitarios
    └── Users/              # Tests de usuarios
```

## 🚀 Inicio Rápido

### Prerrequisitos

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local)
- Cuenta de Azure (para Table Storage y Blob Storage)

### Configuración

1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd RentaSol.Cloud.Api
   ```

2. **Configurar conexiones de Azure**
   
   Editar el archivo `RentaSol.Cloud.Api.Configuracion/ConfiguracionApp.cs` con tus credenciales de Azure:
   ```csharp
   public static string CUENTA_ALMACENAMIENTO = "tu-connection-string";
   public static string ENCRIPTACION_LLAVE = "tu-clave-de-encriptacion";
   public static string LLAVE_JWT = "tu-clave-jwt";
   ```

3. **Restaurar dependencias**
   ```bash
   dotnet restore
   ```

4. **Ejecutar localmente**
   ```bash
   cd RentaSol.Cloud.Api
   func start
   ```

   La API estará disponible en `http://localhost:7071`

5. **Acceder a la documentación Swagger**
   
   Navegar a `http://localhost:7071/api/swagger/ui` para ver todos los endpoints disponibles.

## 📚 Endpoints Principales

### Usuarios
- `POST /api/v1/usuarios/crear` - Registrar nuevo usuario
- `POST /api/v1/usuarios/login` - Iniciar sesión
- `GET /api/v1/usuarios` - Listar usuarios

### Restaurantes
- `POST /api/v1/restaurantes/crear` - Crear restaurante
- `GET /api/v1/restaurantes` - Listar todos los restaurantes
- `GET /api/v1/restaurantes/{userId}` - Obtener restaurante por usuario
- `POST /api/v1/restaurantes/dinning-table/crear` - Crear mesa

### Menús
- `POST /api/v1/restaurantes/menu-category/crear` - Crear categoría de menú
- `POST /api/v1/restaurantes/menu-pdf/crear` - Generar PDF de menú
- `GET /api/v1/restaurantes/menu-pdf/web/{restaurantId}/{menuName}` - Visualizar menú web

### Reservas
- `POST /api/v1/reservas/crear` - Crear reserva
- `PUT /api/v1/reservas/actualizar-estado` - Actualizar estado de reserva
- `GET /api/v1/reservas/{reservationId}/{restaurantId}` - Obtener reserva

### Pagos
- `POST /api/v1/pagos/crear` - Registrar pago

## 🧪 Testing

El proyecto incluye tests unitarios usando **xUnit** y **Moq**. Para ejecutar los tests:

```bash
cd RentaSol.App.Bl.Tests
dotnet test
```

### Cobertura de Tests

- ✅ Tests de autenticación y registro de usuarios
- ✅ Tests de validación de datos
- ✅ Tests de lógica de negocio

## 🔐 Seguridad

- **Encriptación de contraseñas**: Implementada con AES
- **Autenticación JWT**: Tokens seguros para acceso a endpoints protegidos
- **Validación de datos**: FluentValidation para prevenir datos inválidos
- **Manejo de excepciones**: Sistema robusto de manejo de errores

## 📦 Tipos de Usuario

El sistema soporta tres tipos de usuarios:

1. **ADMINISTRATOR (1)**: Administrador del sistema
2. **OWNER_BUSSINES (2)**: Propietario de restaurante
3. **CUSTOMER (3)**: Cliente que realiza reservas

## 🌐 Características Adicionales

- **Almacenamiento de imágenes**: Subida de logos de restaurantes y fotos de platillos
- **Generación de códigos QR**: Para acceder a menús y reservas
- **Logging**: Sistema de logging en Azure Table Storage
- **API RESTful**: Diseño REST estándar para fácil integración
- **Documentación OpenAPI**: Documentación automática con Swagger

## 📄 Licencia

Este proyecto está bajo licencia privada. Todos los derechos reservados.

## 👥 Contribución

Para contribuir al proyecto, por favor contacta con el equipo de desarrollo.

## 📞 Soporte

Para soporte técnico o consultas, contacta al equipo de desarrollo de RentaSol.

---

**Desarrollado con ❤️ usando .NET y Azure**
