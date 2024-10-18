// Import necessary modules
const express = require('express');
const mysql = require('mysql');
const app = express();

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'store_list'
});

// Endpoint to get food for a specific store
app.get('/store/:store_id/food', (req, res) => {
  const storeId = req.params.store_id;
  const query = `SELECT food_id, food_name, food_price, img_url FROM store${storeId}_food`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Database query error:', error); // Log the error
      return res.status(500).json({ error: 'Error fetching food data' });
    }
    res.json(results);
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
