// Importa el módulo json-server
const jsonServer = require("json-server");
const path = require("path");

// Crear el servidor
const server = jsonServer.create();

// Configurar la base de datos
const router = jsonServer.router(path.join(__dirname, "db.json"));

// Configurar middlewares por defecto (logger, static, cors y no-cache)
const middlewares = jsonServer.defaults();

// Usar los middlewares
server.use(middlewares);

// Usar el router
server.use(router);

// Determinar el puerto
const PORT = process.env.PORT || 10000;

// Iniciar el servidor
server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server está funcionando en http://0.0.0.0:${PORT}`);
});
