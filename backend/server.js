const express = require("express");
const { Pool } = require("pg");

// Initialize express app
const app = express();
app.use(express.json());

// Set up PostgreSQL connection
const dbConnection = new Pool({
  host: process.env.DB_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432
});

// Advanced Health check endpoint (New Feature)
app.get("/api/health", (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/health - Health check requested`);
  res.status(200).json({
    status: "success",
    message: "Ansh's Node.js API is running smoothly!",
    timestamp: new Date().toISOString()
  });
});

// Original health check logic (kept for fallback)
app.get("/health", (req, res) => {
  res.send("Server running - Ansh Pipeline");
});

// Create new user (POST API)
app.post("/users", async (req, res) => {
  console.log(`[${new Date().toISOString()}] POST /users - Inserting new user`);
  try {
    const { name } = req.body;
    
    // Using dbConnection instead of pool
    const queryRes = await dbConnection.query(
      "INSERT INTO users(full_name) VALUES($1) RETURNING *",
      [name]
    );

    res.status(201).json(queryRes.rows[0]);
  } catch (err) {
    console.error("POST /users Error:", err);
    res.status(500).json({ error: "Failed to insert into database" });
  }
});

// Fetch all users (GET API)
app.get("/users", async (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /users - Fetching all users`);
  try {
    // Variable rename result -> queryRes
    const queryRes = await dbConnection.query("SELECT * FROM users");
    res.status(200).json(queryRes.rows);
  } catch (err) {
    console.error("GET /users Error:", err);
    res.status(500).json({ error: "Failed to fetch from database" });
  }
});

// Start server on custom port (Environment Configured)
const PORT = process.env.APP_PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`=================================`);
  console.log(`🚀 Ansh's Server started on port ${PORT}`);
  console.log(`=================================`);
});
