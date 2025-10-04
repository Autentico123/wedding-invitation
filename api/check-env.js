// Environment check endpoint - DO NOT USE IN PRODUCTION
module.exports = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let nodemailerStatus;
  try {
    require('nodemailer');
    nodemailerStatus = '✓ nodemailer can be loaded';
  } catch (e) {
    nodemailerStatus = '✗ nodemailer error: ' + e.message;
  }

  return res.status(200).json({
    success: true,
    environment: {
      NODE_ENV: process.env.NODE_ENV || 'not set',
      EMAIL_USER: process.env.EMAIL_USER ? '✓ Set' : '✗ Not set',
      EMAIL_PASS: process.env.EMAIL_PASS ? '✓ Set' : '✗ Not set',
      COUPLE_EMAIL: process.env.COUPLE_EMAIL ? '✓ Set' : '✗ Not set',
      VITE_API_URL: process.env.VITE_API_URL ? '✓ Set' : '✗ Not set'
    },
    canRequireNodemailer: nodemailerStatus
  });
};
