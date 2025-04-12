export const ROUTES = {
  HOME: {
    path: "/",
    title: "Tablero de Tareas",
  },
  USERS: {
    path: "/usuarios",
    title: "Gestión de Usuarios",
  },
  DOCUMENTATION: {
    path: "/documentacion",
    title: "Documentación",
  },
  AUTHOR: {
    path: "/autor",
    title: "Acerca del Autor",
  },
};

// Helper function to convert paths to display titles if not found in the ROUTES object
export const pathToTitle = (pathname: string): string => {
  // Check if the path exists in our routes
  const foundRoute = Object.values(ROUTES).find(
    (route) => route.path === pathname
  );
  if (foundRoute) return foundRoute.title;

  // Otherwise, format the path
  return (
    pathname
      .split("/")
      .filter(Boolean)
      .map((segment) =>
        segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      )
      .join(" - ") || "Tablero de Tareas"
  );
};
