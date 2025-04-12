const fs = require("fs");
const path = require("path");

// Function to save the current state of the database
const backupDatabase = () => {
  // Read the current state of the database
  const dbData = fs.readFileSync(path.join(__dirname, "../db.json"), "utf8");

  // Save the current state of the database to a backup file
  const backupPath = path.join(__dirname, "../db-backup.json");
  fs.writeFileSync(backupPath, dbData);

  console.log(`Database backed up at ${new Date().toISOString()}`);
};

// Function to restore the database from the backup
const restoreDatabase = () => {
  try {
    const backupPath = path.join(__dirname, "../db-backup.json");

    // Check if a backup exists
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

// Schedule periodic backups (every 5 minutes)
const startBackupService = () => {
  // Restore from backup at startup
  restoreDatabase();

  // Schedule backups every 5 minutes
  setInterval(backupDatabase, 5 * 60 * 1000);

  // Also make a backup when a SIGTERM signal is received
  process.on("SIGTERM", () => {
    console.log(
      "Received SIGTERM signal. Backing up database before shutdown."
    );
    backupDatabase();
    process.exit(0);
  });
};

module.exports = { startBackupService };
