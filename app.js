const express = require("express");
const app = express();
const pool = require("./config");
const comicsRouter = require("./comicsRouter"); //Imports the comicsRouter file

//Use the comicsRouter for handling comics-related API endpoints
app.use("/api", comicsRouter);

//APP ROUTES AND OTHER CONFIGURATIONS GO HERE

//Function to handle the "Quick Update" form submission
function handleQuickUpdateFormSubmit(comic_id) {
  const price = document.getElementById("price-${comic_id}").value;
  const quantity = document.getElementById("quantity-${comic_id}").value;
  const updatedData = { price, quantity };

  //Send PATCH request to update the comic data
  fetch("/api/comics/${comic_id}", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((updatedComic) => {
      //Handle the response
      console.log("Comic Updated:", updatedComic);
    })
    .catch((error) => {
      console.error("Error upudating comic:", error);
    });
}

//Function to attach event listeners to "Quick Update" forms
function attachQuickUpdateFormListeners() {
  const quickUpdateForms = document.querySelectorAll(".quick-update-form");
  quickUpdateForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const comic_id = form.dataset.comic_id;
      handleQuickUpdateFormSubmit(comic_id);
    });
  });
}

//Call function when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  attachQuickUpdateFormListeners();
});

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
