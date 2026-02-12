export default function handler(req, res) {
  if (req.method === "POST") {
    const booking = req.body;
    console.log("New Booking:", booking);

    return res.status(200).json({
      success: true
    });
  }

  res.status(200).json({ message: "Booking API working" });
}