const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '1234',
  database: process.env.DB_NAME || 'todo_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');

  // Automatically create the tasks table if it doesn’t exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      completed BOOLEAN DEFAULT FALSE
    )
  `;
  db.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log('✅ Table "tasks" is ready');
  });
});

module.exports = db;
