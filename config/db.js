require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the pool immediately
pool.getConnection()
  .then(conn => {
    console.log('Successfully connected to MySQL');
    conn.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error('Failed to connect to MySQL:', err);
  });

module.exports = pool;