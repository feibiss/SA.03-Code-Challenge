
const movieApiUrl = "http://localhost:3000/films";
const movieList = document.getElementById("films");
const buyTicketButton = document.getElementById("buy-ticket");

document.addEventListener("DOMContentLoaded", () => {
  Movies(movieApiUrl);
});

function Movies(url) {
  fetch(url)
    .then((response) => response.json())
    .then((movies) => {
      movies.forEach(displayMovie);
    })
    .catch(error => console.error(error)); 
}

function displayMovie(movie) {
  const listItem = document.createElement("li");
  listItem.style.cursor = "pointer";
  listItem.textContent = movie.title.toUpperCase();
  movieList.appendChild(listItem);

  listItem.addEventListener("click", () => {
    fetch(`${url}/${movie.id}`)
      .then((res) => res.json())
      .then((movieDetails) => {
        updateMovieDetails(movieDetails);
        buyTicketButton.textContent = "Buy Ticket";
      })
      .catch(error => console.error(error));  
  });
}

function updateMovieDetails(movie) {
  const poster = document.getElementById("poster");
  poster.src = movie.poster;

  const movieTitle = document.querySelector("#title");
  movieTitle.textContent = movie.title;
  const movieTime = document.querySelector("#runtime");
  movieTime.textContent = `${movie.runtime} minutes`;
  const movieDescription = document.querySelector("#film-info");
  movieDescription.textContent = movie.description;
  const showTime = document.querySelector("#showtime");
  showTime.textContent = movie.showtime;
  const tickets = document.querySelector("#ticket-num");
  tickets.textContent = movie.capacity - movie.tickets_sold;
}

buyTicketButton.addEventListener("click", function (e) {
  const ticketsRemaining = parseInt(document.querySelector("#ticket-num").textContent, 10);
  e.preventDefault();
  if (ticketsRemaining > 0) {
    document.querySelector("#ticket-num").textContent = ticketsRemaining - 1;
  } else if (ticketsRemaining === 0) {
    buyTicketButton.classList.add("sold-out"); 
  }
});
