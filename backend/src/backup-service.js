const fs = require("fs");
const path = require("path");
const http = require("http");

// Función para guardar el estado actual de la base de datos
const backupDatabase = () => {
  // Leer el estado actual de la base de datos
  const dbData = fs.readFileSync(path.join(__dirname, "../db.json"), "utf8");

  // Guardar en un archivo de backup
  const backupPath = path.join(__dirname, "../db-backup.json");
  fs.writeFileSync(backupPath, dbData);

  console.log(`Database backed up at ${new Date().toISOString()}`);
};

// Función para restaurar la base de datos desde el backup
const restoreDatabase = () => {
  try {
    const backupPath = path.join(__dirname, "../db-backup.json");

    // Verificar si existe un backup
    if (fs.existsSync(backupPath)) {
      const backupData = fs.readFileSync(backupPath, "utf8");
      fs.writeFileSync(path.join(__dirname, "../db.json"), backupData);
      console.log(
        `Database restored from backup at ${new Date().toISOString()}`
      );
    } else {
      console.log("No backup file found. Starting with empty database.");
    }
  } catch (error) {
    console.error("Error restoring database:", error);
  }
};

// Programar backups periódicos (cada 5 minutos)
const startBackupService = () => {
  // Restaurar desde backup al inicio
  restoreDatabase();

  // Programar backups cada 5 minutos
  setInterval(backupDatabase, 5 * 60 * 1000);

  // También hacer backup cuando se recibe una señal SIGTERM
  process.on("SIGTERM", () => {
    console.log(
      "Received SIGTERM signal. Backing up database before shutdown."
    );
    backupDatabase();
    process.exit(0);
  });
};

module.exports = { startBackupService };
