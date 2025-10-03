import express from "express";
import rsvpController from "../controllers/rsvp.controller.js";

const router = express.Router();

/**
 * RSVP Routes
 */

// Submit RSVP
router.post("/submit", (req, res) => rsvpController.submitRSVP(req, res));

// Get all RSVPs (admin)
router.get("/all", (req, res) => rsvpController.getAllRSVPs(req, res));

// Get statistics
router.get("/statistics", (req, res) => rsvpController.getStatistics(req, res));

export default router;
