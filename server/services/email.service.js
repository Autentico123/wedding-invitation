import { createEmailTransporter, emailConfig } from "../config/email.config.js";

/**
 * Email Service for RSVP notifications
 * Handles sending confirmation emails to guests and notifications to couple
 */
class EmailService {
  constructor() {
    this.transporter = createEmailTransporter();
  }

  /**
   * Send RSVP confirmation email to guest
   */
  async sendGuestConfirmation(rsvpData) {
    const { name, email, attending, guests, dietaryRestrictions } = rsvpData;

    const mailOptions = {
      from: `${emailConfig.from.name} <${emailConfig.from.address}>`,
      to: email,
      subject: "RSVP Confirmation - Jesseca & Syrel's Wedding",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Georgia', serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #8B2635 0%, #6d1e28 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 400;
              }
              .content {
                background: #ffffff;
                padding: 30px;
                border: 2px solid #edc55f;
                border-top: none;
                border-radius: 0 0 10px 10px;
              }
              .info-box {
                background: #fef9f0;
                border-left: 4px solid #edc55f;
                padding: 15px;
                margin: 20px 0;
              }
              .info-box strong {
                color: #8B2635;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 14px;
              }
              .heart {
                color: #8B2635;
                font-size: 20px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>💕 Jesseca & Syrel 💕</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Wedding Celebration</p>
            </div>
            
            <div class="content">
              <h2 style="color: #8B2635;">Dear ${name},</h2>
              
              <p>Thank you for your response to our wedding invitation!</p>
              
              <div class="info-box">
                <p><strong>Your RSVP Details:</strong></p>
                <p>📋 <strong>Status:</strong> ${
                  attending === "yes"
                    ? "✅ Joyfully Accepting"
                    : "❌ Regretfully Declining"
                }</p>
                ${
                  attending === "yes"
                    ? `
                  <p>👥 <strong>Number of Guests:</strong> ${guests}</p>
                  ${
                    dietaryRestrictions
                      ? `<p>🍽️ <strong>Dietary Requirements:</strong> ${dietaryRestrictions}</p>`
                      : ""
                  }
                `
                    : ""
                }
              </div>
              
              ${
                attending === "yes"
                  ? `
                <h3 style="color: #8B2635;">Wedding Details:</h3>
                <div class="info-box">
                  <p>📅 <strong>Date:</strong> October 15, 2024</p>
                  <p>🕕 <strong>Time:</strong> 6:00 PM</p>
                  <p>📍 <strong>Venue:</strong> Grand Ballroom</p>
                  <p>🏢 <strong>Address:</strong> 456 Celebration Avenue, Downtown</p>
                </div>
                
                <p><strong>Dress Code:</strong> Formal Attire in shades of maroon and beige</p>
              `
                  : `
                <p>We're sad you can't make it, but we appreciate you letting us know. You'll be in our thoughts on our special day! <span class="heart">❤️</span></p>
              `
              }
              
              <p>If you need to make any changes to your RSVP, please contact us at <a href="mailto:${
                emailConfig.couple
              }" style="color: #8B2635;">${emailConfig.couple}</a></p>
              
              <div class="footer">
                <p>With love and gratitude,</p>
                <p style="font-size: 18px; color: #8B2635; font-weight: bold;">Jesseca & Syrel</p>
                <p style="margin-top: 20px;">
                  <span class="heart">💕</span> 
                  <span style="color: #edc55f;">✨</span> 
                  <span class="heart">💕</span>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Dear ${name},

Thank you for your RSVP!

Your Response: ${
        attending === "yes" ? "Joyfully Accepting" : "Regretfully Declining"
      }
${attending === "yes" ? `Number of Guests: ${guests}` : ""}
${dietaryRestrictions ? `Dietary Requirements: ${dietaryRestrictions}` : ""}

${
  attending === "yes"
    ? `
Wedding Details:
Date: October 15, 2024
Time: 6:00 PM
Venue: Grand Ballroom
Address: 456 Celebration Avenue, Downtown

Dress Code: Formal Attire in shades of maroon and beige
`
    : "We're sad you can't make it, but we appreciate you letting us know."
}

With love,
Jesseca & Syrel
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Confirmation email sent to ${email}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Error sending confirmation email:", error);
      throw error;
    }
  }

  /**
   * Send RSVP notification to couple
   */
  async sendCoupleNotification(rsvpData) {
    const {
      name,
      email,
      phone,
      attending,
      guests,
      dietaryRestrictions,
      message,
    } = rsvpData;

    const mailOptions = {
      from: `${emailConfig.from.name} <${emailConfig.from.address}>`,
      to: emailConfig.couple,
      subject: `New RSVP: ${name} - ${
        attending === "yes" ? "ATTENDING ✅" : "NOT ATTENDING ❌"
      }`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: #8B2635;
                color: white;
                padding: 20px;
                border-radius: 5px;
                margin-bottom: 20px;
              }
              .info-section {
                background: #f9f9f9;
                border: 1px solid #ddd;
                padding: 15px;
                margin: 15px 0;
                border-radius: 5px;
              }
              .status-attending {
                color: #28a745;
                font-weight: bold;
              }
              .status-not-attending {
                color: #dc3545;
                font-weight: bold;
              }
              .label {
                font-weight: bold;
                color: #8B2635;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2 style="margin: 0;">📬 New RSVP Received</h2>
            </div>
            
            <div class="info-section">
              <p><span class="label">Guest Name:</span> ${name}</p>
              <p><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></p>
              ${
                phone
                  ? `<p><span class="label">Phone:</span> <a href="tel:${phone}">${phone}</a></p>`
                  : ""
              }
              <p><span class="label">Status:</span> 
                <span class="${
                  attending === "yes"
                    ? "status-attending"
                    : "status-not-attending"
                }">
                  ${attending === "yes" ? "✅ ATTENDING" : "❌ NOT ATTENDING"}
                </span>
              </p>
              ${
                attending === "yes"
                  ? `<p><span class="label">Number of Guests:</span> ${guests}</p>`
                  : ""
              }
              ${
                dietaryRestrictions
                  ? `<p><span class="label">Dietary Requirements:</span> ${dietaryRestrictions}</p>`
                  : ""
              }
            </div>
            
            ${
              message
                ? `
              <div class="info-section">
                <p class="label">Special Message:</p>
                <p style="font-style: italic;">"${message}"</p>
              </div>
            `
                : ""
            }
            
            <p style="margin-top: 20px; color: #666; font-size: 14px;">
              Received at: ${new Date().toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </body>
        </html>
      `,
      text: `
New RSVP Received

Guest Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}
Status: ${attending === "yes" ? "ATTENDING ✅" : "NOT ATTENDING ❌"}
${attending === "yes" ? `Number of Guests: ${guests}` : ""}
${dietaryRestrictions ? `Dietary Requirements: ${dietaryRestrictions}` : ""}
${message ? `\nMessage: ${message}` : ""}

Received at: ${new Date().toLocaleString()}
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Notification email sent to couple`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Error sending notification email:", error);
      throw error;
    }
  }

  /**
   * Verify email transporter connection
   */
  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log("✅ Email server connection verified");
      return true;
    } catch (error) {
      console.error("❌ Email server connection failed:", error);
      return false;
    }
  }
}

export default new EmailService();
