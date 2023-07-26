const { Pool } = require("pg");

const pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
});

//Function to get all comics from the database
async function getAllComics(queryParams) {
  try {
    const client = await pool.connect();
    const { rows } = await client.query("SELECT * FROM comics");
    client.release();
    return rows;
  } catch (error) {
    console.error("Error fetching all comics: ", error);
    throw error; //Re-throw the error to be caught by the calling function
  }
}

//Function to get a single comic by ID from the database
async function getComicById(comic_id) {
  try {
    const client = await pool.connect();
    const { rows } = await client.query("SELECT * FROM comics WHERE id = $1", [
      comic_id,
    ]);
    client.release();
    return rows[0] || null;
  } catch (error) {
    console.error("Error Fetching Comic by ID: ", error);
    throw error;
  }
}

//Function to create a new comic in the database
async function createComic(comicData) {
  try {
    const { title, issue, release_date, artist, price, description, quantity } =
      comicData;
    const client = await pool.connect();
    const { rows } = await client.query(
      "INSERT INTO comics (title, issue, release_date, artist, price, description, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, issue, release_date, artist, price, description, quantity]
    );
    client.release();
    return rows[0];
  } catch (error) {
    console.error("Error Creating Comic: ", error);
    throw error;
  }
}

//Function to update a comic in the database
async function updateComic(comic_id, comicData) {
  try {
    const { title, issue, release_date, artist, price, description, quantity } =
      comicData;
    const client = await pool.connect();
    const { rows } = await client.query(
      "UPDATE comics SET title = $1, issue = $2, release_date = $3, artist = $4, price = $5, description = $6, quantity = $7 WHERE id = $8 RETURNING *",
      [
        title,
        issue,
        release_date,
        artist,
        price,
        description,
        quantity,
        comic_id,
      ]
    );
    client.release();
    return rows[0] || null;
  } catch (error) {
    console.error("Error Updating Comic: ", error);
    throw error;
  }
}

//Function to delete a comic from the database
async function deleteComic(comic_id) {
  try {
    const client = await pool.connect();
    const { rows } = await client.query(
      "DELETE FROM comics WHERE id = $1 RETURNING *",
      [comic_id]
    );
    client.release();
    return rows[0] || null;
  } catch (error) {
    console.error("Error Deleting Comic: ", error);
    throw error;
  }
}

//Export all functions
module.exports = {
  getAllComics,
  getComicById,
  createComic,
  updateComic,
  deleteComic,
};
