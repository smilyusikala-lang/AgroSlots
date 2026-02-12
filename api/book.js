export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const booking = req.body;
  console.log("New Booking:", booking);

  res.json({ success: true });
}