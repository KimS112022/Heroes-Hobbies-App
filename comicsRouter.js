const express = require("express");
const router = express.Router();
const pool = require("./config"); //Import the PostgreSQL conncection pool

//Endpoint to fetch all comics
router.get("/comics", async (req, res) => {
  try {
    const queryResult = await pool.query("SELECT * FROM comics");
    res.json(queryResult.rows);
  } catch (err) {
    console.error("Error fetching comics: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Endpoint to fetch a single comic by id
router.get("/comics/:id", async (req, res) => {
  const comic_id = req.params.id;

  try {
    const queryResult = await pool.query("SELECT * FROM comics WHERE id = $1", [
      comic_id,
    ]);
    if (queryResult.rowCount === 0) {
      res.status(404).json({ error: "Comic not found" });
    } else {
      res.json(queryResult.rows[0]);
    }
  } catch (err) {
    console.error("Error fetching comic by id:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Endpoint to add a new comic
router.post("comics", async (req, res) => {
  const { title, issue, release_date, artist, price, description, quantity } =
    req.body;

  try {
    const queryResult = await pool.query(
      "INSERT INTO comics (title, issue, release_date, artist, price, description, quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, issue, release_date, artist, price, description, quantity]
    );

    res.status(201).json(queryResult.rows[0]);
  } catch (err) {
    console.error("Error adding comic: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Endpoint to update a comic by id
router.put("/comics/:id", async (req, res) => {
  const comic_id = req.params.id;
  const { title, issue, release_date, artise, price, description, quantity } =
    req.body;

  try {
    const queryResult = await pool.query(
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

    if (queryResult.rowCount === 0) {
      res.status(404).json({ error: "Comic not found" });
    } else {
      res.json(queryResult.rows[0]);
    }
  } catch (err) {
    console.error("Error updating comic: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Endpoint to delete a comic by id
router.delete("/comics/:id", async (req, res) => {
  const comic_id = req.params.id;

  try {
    const queryResult = await pool.query(
      "DELETE FROM comics WHERE id = $1 RETURNING *",
      [comic_id]
    );

    if (queryResult.rowCount === 0) {
      res.status(404).json({ error: "Comic not found " });
    } else {
      res.json({ message: "Comic deleted successfully" });
    }
  } catch (err) {
    console.error("Error deleting comic: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
