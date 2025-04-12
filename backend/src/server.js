const jsonServer = require("json-server");
const { startBackupService } = require("./backup-service");
const path = require("path");

// Render asigna automáticamente el puerto en la variable PORT
const PORT = process.env.PORT || 10000;
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "../db.json"));
const middlewares = jsonServer.defaults();

// Iniciar el servicio de backup
startBackupService();

server.use(middlewares);
server.use(router);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
