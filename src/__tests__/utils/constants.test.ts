import { ROUTES, pathToTitle } from "@/utils/constants";

describe("Constants utilities", () => {
  describe("ROUTES", () => {
    test("should have HOME route defined", () => {
      expect(ROUTES.HOME).toBeDefined();
      expect(ROUTES.HOME.path).toBe("/");
      expect(ROUTES.HOME.title).toBe("Tablero de Tareas");
    });

    test("should have USERS route defined", () => {
      expect(ROUTES.USERS).toBeDefined();
      expect(ROUTES.USERS.path).toBe("/usuarios");
      expect(ROUTES.USERS.title).toBe("Gestión de Usuarios");
    });

    test("should have DOCUMENTATION route defined", () => {
      expect(ROUTES.DOCUMENTATION).toBeDefined();
      expect(ROUTES.DOCUMENTATION.path).toBe("/documentacion");
      expect(ROUTES.DOCUMENTATION.title).toBe("Documentación");
    });

    test("should have AUTHOR route defined", () => {
      expect(ROUTES.AUTHOR).toBeDefined();
      expect(ROUTES.AUTHOR.path).toBe("/autor");
      expect(ROUTES.AUTHOR.title).toBe("Acerca del Autor");
    });
  });

  describe("pathToTitle", () => {
    test("should return the title for a known route", () => {
      expect(pathToTitle("/")).toBe("Tablero de Tareas");
      expect(pathToTitle("/usuarios")).toBe("Gestión de Usuarios");
      expect(pathToTitle("/documentacion")).toBe("Documentación");
      expect(pathToTitle("/autor")).toBe("Acerca del Autor");
    });

    test("should format unknown paths correctly", () => {
      expect(pathToTitle("/nueva-ruta")).toBe("Nueva Ruta");
      expect(pathToTitle("/ruta/anidada")).toBe("Ruta - Anidada");
      expect(pathToTitle("/usuarios/detalle")).toBe("Usuarios - Detalle");
    });

    test("should return default title for empty path", () => {
      expect(pathToTitle("")).toBe("Tablero de Tareas");
    });
  });
});
