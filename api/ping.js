export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  res.status(200).json({ 
    status: "ok",
    message: "API is working!",
    timestamp: Date.now()
  });
}
