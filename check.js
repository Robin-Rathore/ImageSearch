const accessKey = "9kpCK8G29Zn4jlWwa-PG8jAl0KPLlwzObUimGGGWgBg";
const form = document.querySelector("form");
const input = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const searchButton = document.getElementById("search-button");

let searchTerm = "";
let page = 1;

const fetchRandomImages = () => {
  fetch(`https://api.unsplash.com/photos/random?count=50&client_id=${accessKey}`)
    .then((response) => response.json())
    .then((data) => {
      searchResults.innerHTML = ""; // Clear previous results
      data.forEach((element) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        imageWrapper.innerHTML = `
          <img src="${element.urls.small}" alt="Random Image" />
        `;
        searchResults.appendChild(imageWrapper);
      });
    })
    .catch((error) => {
      console.error("Error fetching random images:", error);
    });
};

const fetchSearchResults = () => {
  fetch(
    `https://api.unsplash.com/search/photos?page=${page}&per_page=50&query=${searchTerm}&client_id=${accessKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (page === 1) {
        searchResults.innerHTML = ""; // Clear previous results
      }
      data.results.forEach((element) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        imageWrapper.innerHTML = `
          <img src="${element.urls.small}" alt="Not Found" />
          <a href="${element.links.download}">${element.alt_description.slice(0, 20) + "..."}</a>
        `;
        searchResults.appendChild(imageWrapper);
      });
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
    });
};

const handleSearch = (event) => {
  event.preventDefault();
  page = 1;
  searchTerm = input.value;

  if (searchTerm) {
    fetchSearchResults();
  } else {
    fetchRandomImages();
  }
};

form.addEventListener("submit", handleSearch);

// Optional: Implement debounce for the input field to prevent excessive API calls
let debounceTimeout;
input.addEventListener("input", () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(handleSearch, 300); // Adjust the debounce delay as needed
});

// Load random images initially
fetchRandomImages();
