import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import rsvpRoutes from "../server/routes/rsvp.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes - without /api prefix since Vercel handles that
app.use("/rsvp", rsvpRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Wedding RSVP API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "production",
  });
});

// Root API endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Wedding Invitation API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      rsvp: "/api/rsvp/submit",
      statistics: "/api/rsvp/statistics"
    }
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    path: req.path,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Export for Vercel serverless function
export default app;
