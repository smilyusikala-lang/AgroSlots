const express = require('express');
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
});