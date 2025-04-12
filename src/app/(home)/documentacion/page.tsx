import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentación | InnerKanban",
  description: "Documentación de InnerKanban",
  keywords: "documentación, innerkanban",
};

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 md:px-0 pb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-flush-orange-500 font-bold mb-4 sm:mb-6 underline">
        InnerKanban
      </h1>

      <p className="mb-4 sm:mb-6 text-sm sm:text-base">
        Aplicación de tablero Kanban implementada con Next.js para gestión y
        organización de tareas. Desarrollada como prueba técnica frontend
        siguiendo principios de arquitectura limpia.
      </p>

      <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">
        Stack Tecnológico
      </h2>
      <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 text-sm sm:text-base">
        <li>
          <strong>Frontend</strong>: Next.js 15.3.0, React 19, Tailwind CSS 4
        </li>
        <li>
          <strong>Backend</strong>: JSON Server (API RESTful)
        </li>
        <li>
          <strong>Testing</strong>: Jest, React Testing Library
        </li>
        <li>
          <strong>Drag and Drop</strong>: dnd-kit
        </li>
        <li>
          <strong>Persistencia</strong>: IndexedDB, JSON
        </li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">
        Características Implementadas
      </h2>
      <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 text-sm sm:text-base">
        <li>Tablero Kanban con visualización de tareas por estados</li>
        <li>Funcionalidad drag and drop para actualización de estados</li>
        <li>Diseño responsive (móvil/escritorio)</li>
        <li>Persistencia local con IndexedDB</li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">
        Arquitectura del Proyecto
      </h2>
      <p className="mb-4 text-sm sm:text-base">
        El proyecto implementa los principios de arquitectura limpia basados en{" "}
        <a
          href="https://github.com/alan2207/bulletproof-react"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bulletproof React
        </a>
        , permitiendo escalabilidad y mantenibilidad del código.
      </p>

      <h3 className="text-lg sm:text-xl font-bold mt-5 sm:mt-6 mb-2 sm:mb-3">
        Estructura de Carpetas
      </h3>
      <div className="bg-gray-100 p-3 sm:p-4 rounded mb-4 sm:mb-6 overflow-auto text-xs sm:text-sm">
        <pre className="whitespace-pre-wrap sm:whitespace-pre">
          <code>
            {`├── src/
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
└── types/                   # Definiciones de tipos TypeScript`}
          </code>
        </pre>
      </div>

      <h3 className="text-lg sm:text-xl font-bold mt-5 sm:mt-6 mb-2 sm:mb-3">
        Convención de Nomenclatura
      </h3>
      <p className="mb-3 text-sm sm:text-base">
        El proyecto utiliza kebab-case para archivos y carpetas por los
        siguientes motivos:
      </p>
      <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 text-sm sm:text-base">
        <li>
          <strong>Legibilidad</strong>: Mejora la distinción visual entre
          palabras en proyectos grandes
        </li>
        <li>
          <strong>Compatibilidad</strong>: Evita problemas en sistemas
          operativos case-sensitive
        </li>
        <li>
          <strong>Consistencia URL</strong>: Mantiene coherencia con las rutas
          de aplicación
        </li>
        <li>
          <strong>Uniformidad</strong>: Garantiza consistencia entre diferentes
          entornos de desarrollo
        </li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">
        Configuración de Desarrollo
      </h2>
      <div className="bg-gray-100 p-3 sm:p-4 rounded mb-4 sm:mb-6 overflow-auto text-xs sm:text-sm">
        <pre className="whitespace-pre-wrap sm:whitespace-pre">
          <code>
            {`# Iniciar frontend
npm run dev

# Iniciar backend
npm run backend

# Iniciar ambos servicios
npm run dev:all`}
          </code>
        </pre>
      </div>
      <p className="mb-4 sm:mb-6 text-sm sm:text-base">
        Acceder a la aplicación en{" "}
        <a
          href="http://localhost:3000"
          className="text-blue-600 hover:underline"
        >
          http://localhost:3000
        </a>
      </p>

      <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">
        Ejecución de Pruebas
      </h2>
      <div className="bg-gray-100 p-3 sm:p-4 rounded mb-4 sm:mb-6 overflow-auto text-xs sm:text-sm">
        <pre className="whitespace-pre-wrap sm:whitespace-pre">
          <code>
            {`# Ejecutar suite de pruebas
npm test

# Modo observador
npm run test:watch

# Análisis de cobertura
npm run test:coverage`}
          </code>
        </pre>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">
        Despliegue
      </h2>
      <p className="mb-3 text-sm sm:text-base">
        La aplicación está desplegada en:
      </p>
      <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 text-sm sm:text-base">
        <li className="mb-2">
          <strong>Frontend</strong>:{" "}
          <a
            href="https://innerconsulting.vercel.app/"
            className="text-blue-600 hover:underline break-words"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://innerconsulting.vercel.app/
          </a>{" "}
          (Vercel)
        </li>
        <li>
          <strong>Backend</strong>:{" "}
          <a
            href="https://innerconsulting.onrender.com/"
            className="text-blue-600 hover:underline break-words"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://innerconsulting.onrender.com/
          </a>{" "}
          (Render)
        </li>
      </ul>

      <h3 className="text-lg sm:text-xl font-bold mt-5 sm:mt-6 mb-2 sm:mb-3">
        Endpoints API
      </h3>
      <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 text-sm sm:text-base">
        <li>
          <code className="bg-gray-100 px-1 rounded text-sm">/users</code> -
          Obtención de usuarios
        </li>
        <li>
          <code className="bg-gray-100 px-1 rounded text-sm">/tasks</code> -
          Gestión de tareas
        </li>
      </ul>
    </div>
  );
}
