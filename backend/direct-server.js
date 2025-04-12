const { spawn } = require("child_process");
const path = require("path");

// Determinar el puerto
const PORT = process.env.PORT || 10000;

// Ruta al archivo db.json
const dbPath = path.join(__dirname, "db.json");

console.log(
  `Iniciando JSON Server en el puerto ${PORT} con la base de datos ${dbPath}`
);

// Usar NPX para ejecutar json-server directamente
const jsonServer = spawn(
  "npx",
  ["json-server", "--watch", dbPath, "--port", PORT, "--host", "0.0.0.0"],
  {
    stdio: "inherit",
  }
);

// Manejar los eventos del proceso
jsonServer.on("error", (error) => {
  console.error("Error al iniciar JSON Server:", error);
  process.exit(1);
});

jsonServer.on("close", (code) => {
  console.log(`JSON Server se cerró con código: ${code}`);
  process.exit(code);
});

// Manejar señales de terminación
process.on("SIGTERM", () => {
  console.log("Recibida señal SIGTERM, terminando...");
  jsonServer.kill();
});

process.on("SIGINT", () => {
  console.log("Recibida señal SIGINT, terminando...");
  jsonServer.kill();
});
