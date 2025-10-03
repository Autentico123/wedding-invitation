import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import rsvpRoutes from "./routes/rsvp.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use("/api/rsvp", rsvpRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Wedding RSVP API is running",
    timestamp: new Date().toISOString(),
  });
});

// Serve static files from React build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));

  // Handle React routing - return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
  });
}

// Development mode message
if (process.env.NODE_ENV !== "production") {
  console.log("🚀 Wedding RSVP Server running on port", PORT);
  console.log("📧 Email notifications enabled");
  console.log("🌐 Frontend URL:", process.env.FRONTEND_URL || "http://localhost:3000");
}

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`✅ Server running in production mode on port ${PORT}`);
  } else {
    console.log(`✅ Server running in development mode on port ${PORT}`);
  }
});

export default app;