// Ultra-simple test to see if async works at all
export default async function handler(req, res) {
  res.status(200).json({
    success: true,
    message: "Async handler works!",
    method: req.method,
    timestamp: new Date().toISOString()
  });
}
