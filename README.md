# InnerKanban

Aplicación de tablero Kanban implementada con Next.js para gestión y organización de tareas. Desarrollada como prueba técnica frontend siguiendo principios de arquitectura limpia.

## Stack Tecnológico

- **Frontend**: Next.js 15.3.0, React 19, Tailwind CSS 4
- **Backend**: JSON Server (API RESTful)
- **Testing**: Jest, React Testing Library
- **Drag and Drop**: dnd-kit
- **Persistencia**: IndexedDB, JSON

## Características Implementadas

- Tablero Kanban con visualización de tareas por estados
- Funcionalidad drag and drop para actualización de estados
- Diseño responsive (móvil/escritorio)
- Persistencia local con IndexedDB

## Arquitectura del Proyecto

El proyecto implementa los principios de arquitectura limpia basados en [Bulletproof React](https://github.com/alan2207/bulletproof-react), permitiendo escalabilidad y mantenibilidad del código.

### Estructura de Carpetas

```
├── src/
│   ├── app/                 # Implementación de App Router de Next.js
│   │   ├── (home)/          # Rutas públicas de la aplicación
│   │   ├── providers/       # Proveedores a nivel de aplicación
│   │   └── globals.css      # Estilos globales
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/              # Componentes de interfaz de usuario
│   │   └── error/           # Componentes para manejo de errores
│   ├── features/            # Módulos por funcionalidad
│   │   ├── tasks/           # Funcionalidad de tareas
│   │   ├── users/           # Funcionalidad de usuarios
│   │   └── storage/         # Gestión de almacenamiento
│   ├── hooks/               # Custom hooks
│   ├── context/             # Contextos de React
│   ├── utils/               # Funciones utilitarias
│   ├── assets/              # Recursos estáticos
│   └── __tests__/           # Tests de la aplicación
├── backend/                 # Servidor mock con json-server
│   ├── db.json              # Base de datos JSON
│   └── src/                 # Código del servidor
├── public/                  # Activos estáticos públicos
└── types/                   # Definiciones de tipos TypeScript
```

### Convención de Nomenclatura

El proyecto utiliza kebab-case para archivos y carpetas por los siguientes motivos:

- **Legibilidad**: Mejora la distinción visual entre palabras en proyectos grandes
- **Compatibilidad**: Evita problemas en sistemas operativos case-sensitive
- **Consistencia URL**: Mantiene coherencia con las rutas de aplicación
- **Uniformidad**: Garantiza consistencia entre diferentes entornos de desarrollo

## Configuración de Desarrollo

```bash
# Iniciar frontend
npm run dev

# Iniciar backend
npm run backend

# Iniciar ambos servicios
npm run dev:all
```

Acceder a la aplicación en [http://localhost:3000](http://localhost:3000)

## Ejecución de Pruebas

```bash
# Ejecutar suite de pruebas
npm test

# Modo observador
npm run test:watch

# Análisis de cobertura
npm run test:coverage
```

## Despliegue

La aplicación está desplegada en:

- **Frontend**: [https://innerconsulting.vercel.app/](https://innerconsulting.vercel.app/) (Vercel)
- **Backend**: [https://innerconsulting.onrender.com/](https://innerconsulting.onrender.com/) (Render)

### Endpoints API
- `/users` - Obtención de usuarios
- `/tasks` - Gestión de tareas
