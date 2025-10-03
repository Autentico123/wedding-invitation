import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import emailService from "../services/email.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RSVP_DATA_PATH = path.join(__dirname, "../data/rsvp.json");

/**
 * RSVP Controller
 * Handles RSVP submission, storage, and email notifications
 */
class RSVPController {
  /**
   * Initialize data directory and file
   */
  async initializeDataFile() {
    try {
      const dataDir = path.dirname(RSVP_DATA_PATH);

      // Create directory if it doesn't exist
      await fs.mkdir(dataDir, { recursive: true });

      try {
        // Check if file exists
        await fs.access(RSVP_DATA_PATH);

        // Verify file has valid JSON
        const fileContent = await fs.readFile(RSVP_DATA_PATH, "utf-8");

        // If file is empty or invalid, reinitialize
        if (!fileContent.trim()) {
          throw new Error("Empty file");
        }

        try {
          JSON.parse(fileContent);
        } catch {
          throw new Error("Invalid JSON");
        }
      } catch (error) {
        // File doesn't exist, is empty, or has invalid JSON - create new one
        const initialData = { rsvps: [] };
        await fs.writeFile(
          RSVP_DATA_PATH,
          JSON.stringify(initialData, null, 2),
          "utf-8"
        );
        console.log("✅ RSVP data file initialized");
      }
    } catch (error) {
      console.error("❌ Error initializing data file:", error);
      throw error;
    }
  }

  /**
   * Submit new RSVP
   */
  async submitRSVP(req, res) {
    try {
      const rsvpData = {
        ...req.body,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ipAddress: req.ip,
      };

      // Validate required fields
      if (!rsvpData.name || !rsvpData.email || !rsvpData.attending) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      // Initialize data file if needed
      await this.initializeDataFile();

      // Read existing RSVPs with error handling
      let data;
      try {
        const fileContent = await fs.readFile(RSVP_DATA_PATH, "utf-8");
        data = JSON.parse(fileContent);

        // Ensure data has rsvps array
        if (!data.rsvps || !Array.isArray(data.rsvps)) {
          data = { rsvps: [] };
        }
      } catch (error) {
        console.error("⚠️ Error reading file, creating new data:", error);
        data = { rsvps: [] };
      }

      // Add new RSVP
      data.rsvps.push(rsvpData);

      // Save to file with error handling
      try {
        await fs.writeFile(
          RSVP_DATA_PATH,
          JSON.stringify(data, null, 2),
          "utf-8"
        );
        console.log(`📝 RSVP saved: ${rsvpData.name} - ${rsvpData.attending}`);
      } catch (writeError) {
        console.error("❌ Error writing to file:", writeError);
        throw new Error("Failed to save RSVP data");
      }

      // Send emails asynchronously (don't wait for completion)
      Promise.all([
        emailService.sendGuestConfirmation(rsvpData),
        emailService.sendCoupleNotification(rsvpData),
      ]).catch((emailError) => {
        console.error("⚠️ Email sending failed:", emailError);
      });

      res.status(201).json({
        success: true,
        message: "RSVP submitted successfully",
        data: {
          id: rsvpData.id,
          name: rsvpData.name,
          attending: rsvpData.attending,
        },
      });
    } catch (error) {
      console.error("❌ Error submitting RSVP:", error);
      res.status(500).json({
        success: false,
        message: "Failed to submit RSVP",
        error: error.message,
      });
    }
  }

  /**
   * Get all RSVPs (for admin use)
   */
  async getAllRSVPs(req, res) {
    try {
      await this.initializeDataFile();

      const fileContent = await fs.readFile(RSVP_DATA_PATH, "utf-8");
      const data = JSON.parse(fileContent);

      res.status(200).json({
        success: true,
        count: data.rsvps.length,
        data: data.rsvps,
      });
    } catch (error) {
      console.error("❌ Error fetching RSVPs:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch RSVPs",
        error: error.message,
      });
    }
  }

  /**
   * Get RSVP statistics
   */
  async getStatistics(req, res) {
    try {
      await this.initializeDataFile();

      const fileContent = await fs.readFile(RSVP_DATA_PATH, "utf-8");
      const data = JSON.parse(fileContent);

      const stats = {
        total: data.rsvps.length,
        attending: data.rsvps.filter((r) => r.attending === "yes").length,
        notAttending: data.rsvps.filter((r) => r.attending === "no").length,
        totalGuests: data.rsvps
          .filter((r) => r.attending === "yes")
          .reduce((sum, r) => sum + parseInt(r.guests || 1), 0),
      };

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error("❌ Error calculating statistics:", error);
      res.status(500).json({
        success: false,
        message: "Failed to calculate statistics",
        error: error.message,
      });
    }
  }
}

export default new RSVPController();
