import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Email transporter configuration
 * Uses Gmail SMTP - requires App-Specific Password
 */
export const createEmailTransporter = () => {
  return createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Email templates configuration
 */
export const emailConfig = {
  from: {
    name: "Jesseca & Syrel Wedding",
    address: process.env.EMAIL_USER,
  },
  couple: process.env.COUPLE_EMAIL,
};

export default {
  createEmailTransporter,
  emailConfig,
};
