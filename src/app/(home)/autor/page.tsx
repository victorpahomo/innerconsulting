import { Metadata } from "next";
import Image from "next/image";

import victor from "@/assets/jpg/ghibli_avatar.jpg";

export const metadata: Metadata = {
  title: "Victorpahomo | InnerKanban",
  description: "Autor de InnerKanban",
  keywords: "autor, innerkanban, sobre mí",
};

export default function AuthorPage() {
  return (
    <div className="container mx-auto px-4 md:px-0 pb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-flush-orange-500 font-bold mb-4 sm:mb-6 underline">
        Sobre mí
      </h1>

      <p className="mb-4 sm:mb-6 text-sm sm:text-base">
        Soy Víctor Manuel Morales Hoyos, desde Cali/Popayán (Colombia). Llevo 4
        años dedicados al frontend, impulsando proyectos que combinan
        rendimiento, escalabilidad y diseño centrado en el usuario.
      </p>

      <p className="mb-4 sm:mb-6 text-sm sm:text-base">En mi trayectoria he:</p>
      <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 text-sm sm:text-base">
        <li>
          Liderado la reestructuración de plataformas de juegos de{" "}
          <strong>Atomo Gaming</strong>, integrando multiples pasarelas de pago
          y proveedores de contenido, usando SSR y Route Handlers para mejorar
          la seguridad y rendimiento, aplicando cacheo y lazy loading para
          optimizar tiempos de carga.
        </li>
        <li>
          Migrado arquitecturas monolíticas a microservicios en{" "}
          <strong>cubiko.co</strong>, reduciendo un 30% el tiempo de carga,
          mejorando SEO, la accesibilidad y la experiencia del usuario.
        </li>
        <li>
          Desarrollado componentes modulares en diferentes frameworks en{" "}
          <strong>Makaia</strong>, garantizando calidad y consistencia en
          múltiples entornos.
        </li>
        <li>
          Entregado soluciones full‑stack como freelance, combinando React,
          Node.js, Firebase, Prisma, entre otras muchas tecnologías para
          proyectos de alta demanda.
        </li>
        <li>
          En mi rol como Ingeniero de Software, he usado multiples lenguajes
          como Java, Python, C#, C++, pero mi verdadera pasión es el desarrollo
          frontend.
        </li>
      </ul>

      <p className="mb-4 sm:mb-6 text-sm sm:text-base">
        Mis herramientas favoritas:
      </p>
      <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 text-sm sm:text-base">
        <li>
          <strong>Frameworks/librerías:</strong> Next.js, React
        </li>
        <li>
          <strong>Lenguajes:</strong> TypeScript, JavaScript
        </li>
        <li>
          <strong>Estilos:</strong> CSS, Tailwind CSS, SASS, Bootstrap, Styled
          Components
        </li>
        <li>
          <strong>Infra:</strong> Docker, Kubernetes, AWS
        </li>
        <li>
          <strong>UX/UI:</strong> Figma, Illustrator
        </li>
        <li>
          <strong>Testing:</strong> Jest, React Testing Library, Cypress
        </li>
        <li>
          <strong>Metodologías:</strong> Scrum, Kanban
        </li>
        <li>
          <strong>Idiomas:</strong> Español (nativo), Inglés B1, Francés B1
        </li>
      </ul>

      <Image
        src={victor}
        alt="Victor Morales"
        width={200}
        height={200}
        className="rounded-full object-cover mx-auto"
      />

      <p className="italic font-medium text-sm sm:text-base text-center py-4">
        ¿Tienes un reto frontend?{" "}
        <a
          href="https://www.linkedin.com/in/victorpahomo/"
          target="_blank"
          className="text-flush-orange-500 hover:underline"
        >
          Conversemos
        </a>
        .
      </p>
    </div>
  );
}
