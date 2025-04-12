import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentación | InnerKanban",
  description: "Documentación de InnerKanban",
  keywords: "documentación, innerkanban",
};

export default function DocumentationPage() {
  return (
    <div className="container mx-auto pb-8">
      <h1 className="text-3xl text-flush-orange-500 font-bold mb-6 underline">
        InnerKanban
      </h1>

      <p className="mb-6">
        Aplicación de tablero Kanban implementada con Next.js para gestión y
        organización de tareas. Desarrollada como prueba técnica frontend
        siguiendo principios de arquitectura limpia.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Stack Tecnológico</h2>
      <ul className="list-disc pl-6 mb-6">
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

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Características Implementadas
      </h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Tablero Kanban con visualización de tareas por estados</li>
        <li>Funcionalidad drag and drop para actualización de estados</li>
        <li>Diseño responsive (móvil/escritorio)</li>
        <li>Persistencia local con IndexedDB</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Arquitectura del Proyecto
      </h2>
      <p className="mb-4">
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

      <h3 className="text-xl font-bold mt-6 mb-3">Estructura de Carpetas</h3>
      <div className="bg-gray-100 p-4 rounded mb-6 overflow-auto">
        <pre className="text-sm">
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

      <h3 className="text-xl font-bold mt-6 mb-3">
        Convención de Nomenclatura
      </h3>
      <p className="mb-4">
        El proyecto utiliza kebab-case para archivos y carpetas por los
        siguientes motivos:
      </p>
      <ul className="list-disc pl-6 mb-6">
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

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Configuración de Desarrollo
      </h2>
      <pre className="bg-gray-100 p-4 rounded mb-6">
        <code>
          # Iniciar frontend
          <br />
          npm run dev
          <br />
          <br />
          # Iniciar backend
          <br />
          npm run backend
          <br />
          <br />
          # Iniciar ambos servicios
          <br />
          npm run dev:all
        </code>
      </pre>
      <p className="mb-6">
        Acceder a la aplicación en{" "}
        <a
          href="http://localhost:3000"
          className="text-blue-600 hover:underline"
        >
          http://localhost:3000
        </a>
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Ejecución de Pruebas</h2>
      <pre className="bg-gray-100 p-4 rounded mb-6">
        <code>
          # Ejecutar suite de pruebas
          <br />
          npm test
          <br />
          <br />
          # Modo observador
          <br />
          npm run test:watch
          <br />
          <br />
          # Análisis de cobertura
          <br />
          npm run test:coverage
        </code>
      </pre>

      <h2 className="text-2xl font-bold mt-8 mb-4">Despliegue</h2>
      <p className="mb-4">La aplicación está desplegada en:</p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          <strong>Frontend</strong>:{" "}
          <a
            href="https://innerconsulting.vercel.app/"
            className="text-blue-600 hover:underline"
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
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://innerconsulting.onrender.com/
          </a>{" "}
          (Render)
        </li>
      </ul>

      <h3 className="text-xl font-bold mt-6 mb-3">Endpoints API</h3>
      <ul className="list-disc pl-6 mb-6">
        <li>
          <code>/users</code> - Obtención de usuarios
        </li>
        <li>
          <code>/tasks</code> - Gestión de tareas
        </li>
      </ul>
    </div>
  );
}
