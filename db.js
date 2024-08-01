const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'hadeer2001',
    database: 'todo_app',
    connectTimeout: 60000
  });
  
  module.exports = pool;