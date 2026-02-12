module.exports = (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ success: false });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    res.status(200).json({ success: true, otp });
};