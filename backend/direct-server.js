const { spawn } = require("child_process");
const path = require("path");

// Determine the port
const PORT = process.env.PORT || 10000;

// Path to the db.json file
const dbPath = path.join(__dirname, "db.json");

console.log(`Starting JSON Server on port ${PORT} with the database ${dbPath}`);

// Use NPX to run json-server directly
const jsonServer = spawn(
  "npx",
  ["json-server", "--watch", dbPath, "--port", PORT, "--host", "0.0.0.0"],
  {
    stdio: "inherit",
  }
);

// Handle the process events
jsonServer.on("error", (error) => {
  console.error("Error starting JSON Server:", error);
  process.exit(1);
});

jsonServer.on("close", (code) => {
  console.log(`JSON Server closed with code: ${code}`);
  process.exit(code);
});

// Handle termination signals
process.on("SIGTERM", () => {
  console.log("Received SIGTERM signal, terminating...");
  jsonServer.kill();
});

process.on("SIGINT", () => {
  console.log("Received SIGINT signal, terminating...");
  jsonServer.kill();
});
