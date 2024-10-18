const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost', // Your DB host
    user: 'root',      // Your DB user
    password: '',      // Your DB password
    database: 'store_list' // Your database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Define API route to get stores data
app.get('/stores', (req, res) => {
    const sql = 'SELECT * FROM stores';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
