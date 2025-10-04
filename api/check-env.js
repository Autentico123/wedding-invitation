// Environment check endpoint - DO NOT USE IN PRODUCTION
module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
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
    canRequireNodemailer: (() => {
      try {
        require('nodemailer');
        return '✓ nodemailer can be loaded';
      } catch (e) {
        return `✗ nodemailer error: ${e.message}`;
      }
    })()
  });
};
