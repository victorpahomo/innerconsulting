const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Verificar si json-server está instalado
let jsonServerInstalled = false;
try {
  require.resolve("json-server");
  jsonServerInstalled = true;
} catch (err) {
  console.log("json-server no está instalado. Intentando instalar...");
}

if (!jsonServerInstalled) {
  try {
    // Instalar json-server globalmente
    console.log("Instalando json-server...");
    execSync("npm install json-server@1.0.0-beta.3", { stdio: "inherit" });
    console.log("json-server instalado correctamente.");
  } catch (error) {
    console.error("Error al instalar json-server:", error);
    process.exit(1);
  }
}

// Iniciar server.js después de asegurarnos que json-server está instalado
try {
  console.log("Iniciando servidor...");
  require("./src/server");
} catch (error) {
  console.error("Error al iniciar el servidor:", error);
  process.exit(1);
}
