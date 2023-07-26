const { Pool } = require("pg");
const config = require("./config");
const pool = require("./config");

//Function to get all comics from the database
async function getAllComics(queryParams) {
  //Build the SQL query based on query parameters (if provided)
  let sql = "SELECT * FROM comics";
  const values = [];

  if (Object.keys(queryParams).length > 0) {
    sql += " WHERE ";
    const conditions = [];

    Object.keys(queryParams).forEach((key) => {
      conditions.push(`${key} = $${values.length + 1}`);
      values.push(queryParams[key]);
    });

    sql += conditions.join(" AND ");
  }

  const { rows } = await pool.query(sql, values);
  return rows;
}

//Function to get a single comic by ID from the database
async function getComicById(comicId) {
  const sql = "SELECT * FROM comics WHERE id = $1";
  const values = [comicId];
  const { rows } = await pool.query(sql, values);
  return rows[0];
}

//Function to create a new comic in the database
async function createComic(newComic) {
  const sql =
    "INSERT INTO comics (title, issue, artist, price, description, quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  const values = [
    newComic.title,
    newComic.issue,
    newComic.artist,
    newComic.price,
    newComic.description,
    newComic.quantity,
  ];
  const { rows } = await pool.query(sql, values);
  return rows[0];
}

//Function to update a comic in the database by ID
async function updateComic(comicId, updates) {
  // Build the SQL query for the update
  const updateColumns = Object.keys(updates).map(
    (key, index) => `${key} = $${index + 1}`
  );
  const values = Object.values(updates);
  const sql = `UPDATE comics SET ${updateColumns.join(", ")} WHERE id = $${
    values.length + 1
  } RETURNING *`;

  const { rows } = await pool.query(sql, [...values, comic_id]);
  return rows[0];
}

//Function to delete a comic from the database by ID
async function deleteComic(comicId) {
  const sql = "DELETE FROM comics WHERE id = $1 RETURNING *";
  const values = [comicId];
  const { rows } = await pool.query(sql, values);
  return rows[0];
}

module.exports = {
  getAllComics,
  getComicById,
  createComic,
  updateComic,
  deleteComic,
};
