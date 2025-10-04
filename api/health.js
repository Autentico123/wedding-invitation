// Simple health check endpoint for Vercel serverless function
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: "Wedding RSVP API is running",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "production",
    });
  }

  // Method not allowed
  return res.status(405).json({
    success: false,
    message: "Method not allowed"
  });
}
