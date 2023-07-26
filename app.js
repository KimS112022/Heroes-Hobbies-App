const express = require("express");
const app = express();
const { Pool } = require("pg");
const comicsRouter = require("./comicsRouter"); //Imports the comicsRouter file

//Sets up the EJS view engine
app.set("view engine", "ejs");

//Middleware to serve static files from public directory
app.use(express.static("public"));

//Use the comicsRouter for handling comics-related API endpoints
app.use("/", comicsRouter);

const port = process.env.PORT || 3056; //Sets port number

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//Set up the connection pool using environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, //Environment variable for the database URL
  ssl: {
    rejectUnauthorized: false, //Necessary if using a self-signed SSL certificate with the database
  },
});
