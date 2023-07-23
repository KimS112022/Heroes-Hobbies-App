const express = require("express");
const app = express();
const pool = require("./config");
const comicsRouter = require("./comicsRouter"); //Imports the comicsRouter file

//Use the comicsRouter for handling comics-related API endpoints
app.use("/api", comicsRouter);

//APP ROUTES AND OTHER CONFIGURATIONS GO HERE

const port = process.env.PORT || 3000; //Sets the port number

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const { Pool } = require("pg");

//Set up the connection pool using environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, //Environment variable for the database URL
  ssl: {
    rejectUnauthorized: false, //Necessary if using a self-signed SSL certificate with the database
  },
});
