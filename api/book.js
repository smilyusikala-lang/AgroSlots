export default function handler(req, res) {
  if(req.method === 'POST') {
    const bookingData = req.body;
    console.log("New Booking:", bookingData);
    // TODO: save to database if needed
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}