// Ultra-simple test to see if async works at all
module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  return res.status(200).json({
    success: true,
    message: "Async handler works!",
    method: req.method,
    timestamp: new Date().toISOString()
  });
};
