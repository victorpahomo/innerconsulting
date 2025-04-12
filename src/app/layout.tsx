import AppProviders from "./providers/providers";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InnerKanban - @victorpahomo",
  description:
    "Aplicación de gestión de tareas con tablero Kanban usando Next.js y TailwindCSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body
        className={`${GeistSans.className} min-h-full bg-background-100 p-4`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
