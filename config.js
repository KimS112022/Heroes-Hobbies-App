const { Pool } = require("pg");

const pool = new Pool({
  user: "test-user",
  host: "localhost",
  database: "heroes-hobbies-app",
  password: "test123",
  port: 5432,
});

module.exports = pool;
