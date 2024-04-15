// Database URL
const movieApiUrl = "http://localhost:3000/films";

document.addEventListener("DOMContentLoaded", () => {
  fetchMovies();
  document.querySelector("#buy-ticket").addEventListener("click", handleTicketPurchase);
});

function fetchMovies() {
  fetch(movieApiUrl)
    .then(response => response.json())
    .then(movies => {
      displayMovies(movies);
      const firstMovieItem = document.querySelector("#id1");
      firstMovieItem.dispatchEvent(new Event("click"));
    })
    .catch(error => console.error(error));  // Handle potential errors during fetch
}

function displayMovies(movies) {
  movies.forEach(movie => {
    createMovieListItem(movie);
  });
}

function createMovieListItem(movie) {
  const listItem = document.createElement("li");
  listItem.textContent = movie.title;
  listItem.id = `id${movie.id}`;
  const movieList = document.querySelector("#films");
  movieList.appendChild(listItem);
  listItem.classList.add("film", "item");
  listItem.addEventListener("click", () => displayMovieDetails(movie));
}

function displayMovieDetails(movie) {
  const posterImage = document.querySelector("img#poster");
  posterImage.src = movie.poster;
  posterImage.alt = movie.title;
  const movieInfo = document.querySelector("#showing");
  movieInfo.querySelector("#title").textContent = movie.title;
  movieInfo.querySelector("#runtime").textContent = `${movie.runtime} minutes`;
  movieInfo.querySelector("#film-info").textContent = movie.description;
  movieInfo.querySelector("#showtime").textContent = movie.showtime;
  movieInfo.querySelector("#ticket-num").textContent = `${movie.capacity - movie.tickets_sold} remaining tickets`;
}

function handleTicketPurchase(event) {
  const ticketDisplay = document.querySelector("#ticket-num");
  const remainingTickets = parseInt(ticketDisplay.textContent.split(" ")[0]);
  if (remainingTickets > 0) {
    ticketDisplay.textContent = `${remainingTickets - 1} remaining tickets`;
  } else if (remainingTickets === 0) {
    alert("No more tickets!");
    event.target.classList.add("sold-out");
    event.target.classList.remove("orange");
  }
}
