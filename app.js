const express = require("express");
const app = express();
const comicsRouter = require("./comicsRouter"); //Imports the comicsRouter file

//Use the comicsRouter for handling comics-related API endpoints
app.use("/", comicsRouter);

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

//Set up the connection pool using environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, //Environment variable for the database URL
  ssl: {
    rejectUnauthorized: false, //Necessary if using a self-signed SSL certificate with the database
  },
});

// Function to fetch all comics from the API
async function fetchAllComics() {
  try {
    const response = await axios.get("/api/comics");
    const comics = response.data;

    //Display the list of comics on the UI
    const comicsList = document.getElementById("comics_list");
    comicsList.innerHTML = "";

    comics.forEach((comic) => {
      const listItem = document.createElement("li");
      listItem.innerHTML =
        '<a href="/comics/${comic.id}">${comic.title} - ${comic.issue}</a>';
      comicsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching comics: ", error);
  }
}

//Function to fetch a single comic by ID from the API
async function fetchSingleComic(comic_id) {
  try {
    const response = await axios.get("/api/comics/${comic_id");
    const comic = response.data;

    //Display the detailed info about the comic on the UI
    const comicDetailsContainer = document.getElementById("comic_details");
    comicDetailsContainer.innerHTML = `
      <h2>${comic.title} - ${comic.issue}</h2>
      <p><strong>Artist:</strong> ${comic.artist}</p>
      <p><strong>Price:</strong> ${comic.price}</p>
      <p><strong>Description:</strong> ${comic.description}</p>
      <p><strong>Quantity:</strong> ${comic.quantity}</p>
    `;
  } catch (error) {
    console.error("Error fetching comic by ID: ", error);
  }
}

//Function to handle the search form submission
async function handleSearchFormSubmit(event) {
  event.preventDefault();
  const searchTitle = document.getElementById("searchTitle").value;
  const searchIssue = document.getElementById("searchIssue").value;
  const searchReleaseDate = document.getElementById("searchReleaseDate").value;
  const searchArtist = document.getElementById("searchArtist").value;

  //Construct the API endpoint URL with search parameters
  let apiURL = "/api/comics";
  if (searchTitle) apiURL += "?title=${searchTitle}";
  if (searchIssue) apiURL += "?title=${searchIssue}";
  if (searchReleaseDate) apiURL += "?title=${searchReleaseDate}";
  if (searchArtist) apiURL += "?title=${searchArtist}";

  try {
    const response = await axios.get(apiURL);
    const comics = response.data;

    //Display the filtered list of comics on the UI
    const comicsList = document.getElementById("comics_list");
    comicsList.innerHTML = "";

    comics.forEach((comic) => {
      const listItem = document.createElement("li");
      listItem.innerHTML =
        '<a href="/comics/${comic.id}">${comic.title} - ${comic.issue}</a>';
      comicsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching filtered comics: ", error);
  }
}

//Function to attach event listeners to the search form
function attachSearchFormListener() {
  const searchForm = document.getElementById("search_form");
  searchForm.addEventListener("submit", handleSearchFormSubmit);
}

//Function to attach event listeners when Dom is ready
document.addEventListener("DOMContentLoaded", () => {
  //Fetch and display all comics when the page loads
  fetchAllComics();

  //Attach event listener to the search form
  attachSearchFormListener();
});
