const express = require("express");
const router = express.Router();
const comicsDAL = require("./comicsDAL");

//Define a route for the root URL("/") to render the index view
router.get("/", async (req, res) => {
  try {
    const comics = await comicsDAL.getAllComics(req.query);
    res.render("index", { comics }); //Pass the comics data to the ejs template
  } catch (error) {
    console.error("Error fetching comics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Endpoint to fetch all comics
router.get("/comics/", async (req, res) => {
  try {
    const comics = await comicsDAL.getAllComics(req.query);
    res.json(comics);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Endpoint to fetch a single comic by id
router.get("/api/comics/:id", async (req, res) => {
  try {
    const comic = await comicsDAL.getComicById(req.params.id);
    if (comic) {
      res.json(comic);
    } else {
      res.status(404).json({ error: "Comic not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Endpoint to add a new comic
router.post("/api/comics", async (req, res) => {
  try {
    const comic = await comicsDAL.createComic(req.body);
    res.status(201).json(comic);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Endpoint to update a comic by id
router.put("/api/comics/:id", async (req, res) => {
  try {
    const comic = await comicsDAL.updateComic(req.params.id, req.body);
    if (comic) {
      res.json(comic);
    } else {
      res.status(404).json({ error: "Comic not found" });
    }
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Endpoint to update a comic's details by id using PATCH request
router.patch("/api/comics/:id", async (req, res) => {
  try {
    const comic = await comicsDAL.updateComic(req.params.id, req.body);
    if (comic) {
      res.json(comic);
    } else {
      res.status(404).json({ error: "Comic not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Endpoint to delete a comic by id
router.delete("/api/comics/:id", async (req, res) => {
  try {
    const deletedComic = await comicsDAL.deleteComic(req.params.id);
    if (deletedComic) {
      res.json({ message: "Comic deleted successfully" });
    } else {
      res.status(404).json({ error: "Comic not found" });
    }
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
