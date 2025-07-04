const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6375',
    database: 'reactdata'
});

conn.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports=conn;