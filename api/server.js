// ---------------------------
// Backend for AgroSlots (Public-ready)
// ---------------------------

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// Allow frontend requests from any origin (important for live site)
app.use(cors());
app.use(express.json());

// ---------------------------
// Serve frontend files
// ---------------------------
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---------------------------
// OTP handling
// ---------------------------
const storedOtps = {}; // Stores OTPs in memory by phone number

// Generate OTP
app.post('/api/generate-otp', (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.json({ success: false, message: "Phone number required" });

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    storedOtps[phone] = otp;
    console.log(`OTP for ${phone}: ${otp}`); // For testing

    res.json({ success: true, otp });
});

// Verify OTP
app.post('/api/verify-otp', (req, res) => {
    const { phone, otp } = req.body;
    if (storedOtps[phone] && storedOtps[phone].toString() === otp.toString()) {
        delete storedOtps[phone]; // remove OTP after verification
        return res.json({ success: true });
    }
    res.json({ success: false });
});

// ---------------------------
// Booking submission
// ---------------------------
app.post('/book', (req, res) => {
    const bookingData = req.body;
    console.log('New Booking:', bookingData);
    // TODO: Save booking to database or file
    res.json({ success: true });
});

// ---------------------------
// Start server (public-ready)
// ---------------------------
const PORT = process.env.PORT || 3000; // process.env.PORT is required by hosting providers
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;