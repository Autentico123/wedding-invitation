// RSVP submission endpoint for Vercel serverless function
export default async function handler(req, res) {
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: "Method not allowed. Use POST."
    });
  }

  try {
    // Check for required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: "Email configuration is missing. Please set EMAIL_USER and EMAIL_PASS environment variables."
      });
    }

    // Dynamic import for ES modules
    const nodemailerModule = await import("nodemailer");
    const nodemailer = nodemailerModule.default;
    
    // Check if body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty"
      });
    }
    const { name, email, attendance, guests, message, phone } = req.body;

    // Validation
    if (!name || !email || attendance === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, and attendance"
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to couple
    const coupleEmailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.COUPLE_EMAIL || process.env.EMAIL_USER,
      subject: `New RSVP: ${attendance ? 'Attending' : 'Not Attending'} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #8B4513; text-align: center;">New Wedding RSVP</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Guest Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Attendance:</strong> <span style="color: ${attendance ? '#4CAF50' : '#f44336'}; font-weight: bold;">
              ${attendance ? '✓ Will Attend' : '✗ Cannot Attend'}
            </span></p>
            ${guests ? `<p><strong>Number of Guests:</strong> ${guests}</p>` : ''}
          </div>

          ${message ? `
            <div style="background-color: #fff8e1; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Message</h3>
              <p style="font-style: italic;">"${message}"</p>
            </div>
          ` : ''}

          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666;">
            <p>Received on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    // Confirmation email to guest
    const guestEmailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `RSVP Confirmation - Jesseca & Syrel's Wedding`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #8B4513; text-align: center;">Thank You for Your RSVP!</h2>
          
          <p style="font-size: 16px; color: #333;">Dear ${name},</p>
          
          <p style="font-size: 16px; color: #333;">
            ${attendance 
              ? 'We are thrilled that you will be joining us on our special day! Your presence means the world to us.'
              : 'Thank you for letting us know. We will miss you on our special day, but we appreciate your thoughtfulness in responding.'
            }
          </p>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your RSVP Details</h3>
            <p><strong>Status:</strong> ${attendance ? 'Attending ✓' : 'Not Attending'}</p>
            ${guests ? `<p><strong>Number of Guests:</strong> ${guests}</p>` : ''}
            ${message ? `<p><strong>Your Message:</strong> "${message}"</p>` : ''}
          </div>

          ${attendance ? `
            <div style="background-color: #fff8e1; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Wedding Details</h3>
              <p><strong>Date:</strong> October 16, 2025</p>
              <p><strong>Time:</strong> 9:30 AM</p>
              <p><strong>Venue:</strong> St. Anthony Parish Church<br/>
              Poblacion Norte, Carmen, Bohol</p>
            </div>
          ` : ''}

          <p style="font-size: 16px; color: #333;">
            If you have any questions or need to make changes to your RSVP, please don't hesitate to contact us.
          </p>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #8B4513; font-size: 18px; margin: 0;">With love,</p>
            <p style="color: #8B4513; font-size: 20px; font-weight: bold; margin: 10px 0;">Jesseca & Syrel</p>
          </div>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(coupleEmailOptions);
    await transporter.sendMail(guestEmailOptions);

    // Return success response
    return res.status(200).json({
      success: true,
      message: "RSVP submitted successfully! Check your email for confirmation.",
      data: {
        name,
        email,
        attendance,
        submittedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("RSVP Submission Error:", error);
    
    return res.status(500).json({
      success: false,
      message: "Failed to submit RSVP. Please try again or contact us directly.",
      error: error.message,
      errorType: error.name,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
}
