const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS and parse JSON
app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// ----------------- OTP -----------------
const storedOtps = {};

app.post('/api/generate-otp', (req, res) => {
    const { phone } = req.body;
    if(!phone) return res.json({ success: false, message:"Phone required" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    storedOtps[phone] = otp;
    console.log(`OTP for ${phone}: ${otp}`);
    res.json({ success:true, otp });
});

// ----------------- Booking -----------------
app.post('/api/book', (req,res)=>{
    const booking = req.body;
    console.log("New Booking:", booking);
    // Here you can store in DB in the future
    res.json({ success:true });
});

// Serve home page by default
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'public','home.html'));
});

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));

module.exports = app;