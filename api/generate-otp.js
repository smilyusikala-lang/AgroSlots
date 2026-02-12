export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { phone } = req.body;

  if (!phone) {
    return res.json({ success: false, message: "Phone number required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(`OTP for ${phone}: ${otp}`);

  res.json({ success: true, otp });
}