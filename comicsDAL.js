const { Pool } = require("pg");
const config = require("./config");
const pool = require("./config");

//Function to get all comics from the database
async function getAllComics(queryParams) {
  //Build SQL query based on query parameters (if provided)
  let sql = "SELECT * FROM comics";
  const values = [];

  if (Object.keys(queryParams).length > 0) {
    sql += "WHERE";
    const conditions = [];

    Object.keys(queryParams).forEach((key) => {
      conditions.push("${key} = $${values.length +1}");
      values.push(queryParams[key]);
    });

    sql += conditions.join(" AND");
  }

  const { rows } = await pool.query(sql, values);
  return rows;
}

//Function to get a single comic by ID from the database
async function getComicById(comic_id) {
  const sql = "SELECT * FROM comics WHERE id = $1";
  const values = [comic_id];
  const { rows } = await pool.query(sql, values);
  return rows[0];
}

//Function to create a new comic in the database
async function createComic(newComic) {
  const sql =
    "INSERT INTO comics (title, issue, release_date, artist, price, description, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const values = [
    newComic.title,
    newComic.issue,
    newComic.release_date,
    newComic.artist,
    newComic.price,
    newComic.description,
    newComic.quantity,
  ];
  const { rows } = await pool.query(sql, values);
  return rows[0];
}
