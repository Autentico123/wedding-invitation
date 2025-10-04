// Ultra-simple test - no dependencies, minimal code
module.exports = (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    return res.status(200).json({ 
      status: "ok",
      message: "API is working!",
      timestamp: Date.now()
    });
  } catch (error) {
    return res.status(500).json({ 
      error: error.message 
    });
  }
};
