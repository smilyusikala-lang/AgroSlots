let storedOtps = {};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number required"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    storedOtps[phone] = otp;

    console.log(`OTP for ${phone}: ${otp}`);

    return res.status(200).json({
      success: true,
      otp: otp
    });
  }

  res.status(200).json({ message: "OTP API working" });
}
