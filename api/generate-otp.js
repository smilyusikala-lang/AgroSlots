export default function handler(req, res) {
  if(req.method === 'POST') {
    const { phone } = req.body;
    if(!phone) return res.status(400).json({ success: false, message: "Phone number required" });

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    console.log(`OTP for ${phone}: ${otp}`); // for testing

    res.status(200).json({ success: true, otp });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}