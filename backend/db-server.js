// Import the json-server module
const jsonServer = require("json-server");
const path = require("path");

// Create the server
const server = jsonServer.create();

// Configure the database
const router = jsonServer.router(path.join(__dirname, "db.json"));

// Configure default middlewares (logger, static, cors and no-cache)
const middlewares = jsonServer.defaults();

// Use the middlewares
server.use(middlewares);

// Use the router
server.use(router);

// Determine the port
const PORT = process.env.PORT || 10000;

// Start the server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server is running on http://0.0.0.0:${PORT}`);
});
