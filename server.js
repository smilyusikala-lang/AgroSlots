const express = require('express');
<<<<<<< HEAD
const app = express();
const path = require('path');

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
=======
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'agroslots'
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

app.post('/bookslot', (req, res) => {
    const { name, mobile, crop, quantity, slot_date, slot_time } = req.body;

    const sql = `INSERT INTO bookings (name, mobile, crop, quantity, slot_date, slot_time)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, mobile, crop, quantity, slot_date, slot_time], (err) => {
        if (err) throw err;
        res.send("Slot Booked Successfully!");
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
>>>>>>> e16a4bdc28861b7380cd274cca213958841f683a
});