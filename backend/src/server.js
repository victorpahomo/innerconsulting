const jsonServer = require("json-server");
const { startBackupService } = require("./backup-service");
const path = require("path");

const PORT = process.env.PORT || 3001;
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "../db.json"));
const middlewares = jsonServer.defaults();

// Iniciar el servicio de backup
startBackupService();

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
