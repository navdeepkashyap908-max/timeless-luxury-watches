import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import { connectDB } from "./config/db.js";
import { seedDatabase } from "./seed.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import watchRoutes from "./routes/watchRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import valuationRoutes from "./routes/valuationRoutes.js";

const app = express();

// Middleware: CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:")
      ) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for development testing
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Middleware: Body parser & HTTP request logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "TIMELESS Haute Horlogerie Backend API",
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : mongoose.connection.readyState === 2
        ? "connecting"
        : "disconnected",
  });
});

// API Routes Mount
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/watches", watchRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/valuations", valuationRoutes);

// Catch-all 404 for undefined API endpoints
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: `API route '${req.originalUrl}' does not exist on this Haute Horlogerie server.`,
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Server Startup
const PORT = process.env.PORT || 5000;

export const startServer = async () => {
  await connectDB();
  await seedDatabase();

  const server = app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🏛️  TIMELESS Haute Horlogerie Backend API Server`);
    console.log(`📡  Listening on: http://127.0.0.1:${PORT}`);
    console.log(`🌐  CORS allowed origins: ${allowedOrigins.join(", ")}`);
    console.log(`⚙️  Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`======================================================\n`);
  });

  return server;
};

// Auto-start when executed directly
if (process.argv[1].endsWith("server.js")) {
  startServer();
}

export default app;
