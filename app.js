const express = require("express");
const app = express();
const { Pool } = require("pg");
const comicsRouter = require("./comicsRouter"); //Imports the comicsRouter file

//Sets up the EJS view engine
app.set("view engine", "ejs");

<<<<<<< Updated upstream
//Use the comicsRouter for handling comics-related API endpoints
app.use("/", comicsRouter);

const port = process.env.PORT || 3003; //Sets port number
=======
//Middleware to serve static files from public directory
app.use(express.static("public"));

//Set up the connection pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: heroes - hobbies - app,
  passwords: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnaurhorized: false, //Necessary if using a self-signed SSL certificate with the database.
  },
});

//Add the connection pool to the app.locals so it can be accessed from routes
app.locals.pool = pool;

//Use the comicsRouter for handling comics-related API endpoints
app.use("/", comicsRouter);

const port = process.env.PORT || 3000; //Sets port number
>>>>>>> Stashed changes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
