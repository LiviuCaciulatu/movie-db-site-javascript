import { data } from "/data.js";

const addMovieElement = (content) => {
  return `
    <div class="movie">
      <h2>Title: ${content["title"]}</h2>
      <h3>Actors: ${content["actors"]}</h3>
      <h3>Directors: ${content["directors"]}</h3>
      <h3>Story: ${content["storyline"]}</h3>
      <h4>Release date: ${content["release-date"]}</h4>
      <h4>Runtime: ${content["runtime"]}</h4>
      <h4>Writers: ${content["writers"]}</h4>
      <h4>Year: ${content["year"]}</h4>
    </div>`;
};

const loadEvent = function () {
  const page = window.location.pathname.substring(1);
  // Write your JavaScript code after this line

  console.log("data: ", data);
  console.log("page: ", page);

  const rootElement = document.getElementById("root");

  const renderMoviesForRolePage = (role) => {
  let roleDiv = document.createElement("div");
  data.professionals.forEach((professional, index) => {
    if (professional.roles.includes(role)) {
      let professionalDiv = document.createElement("div");
      professionalDiv.classList.add("movie")
      professionalDiv.insertAdjacentHTML("beforeEnd",`<h2>${role.charAt(0).toUpperCase() + role.slice(1)}: ${professional.name}</h2>`);
      roleDiv.appendChild(professionalDiv);
      data.movies.forEach((movie) => {
        if (movie[`${role}s`].includes(professional.id)) {
          professionalDiv.insertAdjacentHTML("beforeEnd",`<h4>${movie.title}</h4>`);
        }
      });
    }
  });
  rootElement.appendChild(roleDiv);
};


  switch (page) {
    case "movies":
      data.movies.forEach((movie) => {
        movie.writers.forEach((writer, index) => {
          let foundObj = data.professionals.find(function (obj) {
            return obj.id === writer;
          });
          movie.writers.splice(index, 1, foundObj.name);
        });
        movie.actors.forEach((actor, index) => {
          let foundObj = data.professionals.find(function (obj) {
            return obj.id === actor;
          });
          movie.actors.splice(index, 1, foundObj.name);
        });
        movie.directors.forEach((director, index) => {
          let foundObj = data.professionals.find(function (obj) {
            return obj.id === director;
          });
          movie.directors.splice(index, 1, foundObj.name);
        });
        rootElement.insertAdjacentHTML("beforeend", addMovieElement(movie));
      });
      break;
    case "actors":
      renderMoviesForRolePage("actor");
      break;
    case "directors":
      renderMoviesForRolePage("director");
      break;
    case "writers":
      renderMoviesForRolePage("writer");
      break;
    case "genres":
      let genreDiv = document.createElement("div");
      data.genres.forEach((genre) => {
        let movieDiv = document.createElement("div");
        movieDiv.classList.add("movie")
        movieDiv.insertAdjacentHTML("beforeend", `<h2>${genre.name}:</h2>`);
        genreDiv.appendChild(movieDiv);
        data.movies.forEach((movie) => {
          if (movie.genres.includes(genre.name)) {
            movieDiv.insertAdjacentHTML( "beforeend", `<h4>${movie.title}</h4>`);
          }
        });
        rootElement.appendChild(genreDiv);
      });
      break;
    default:
      rootElement.innerHTML += `<h1 class="welcome">WELCOME</h1>`;
      rootElement.insertAdjacentHTML( "beforeend", `<a class="link1" href="http://127.0.0.1:9000/movies">Click on this link to acces the movies page</a>`);
      rootElement.insertAdjacentHTML( "beforeend", `<a class="link2" href="http://127.0.0.1:9000/actors">Click on this link to acces the actors page</a>`);
      rootElement.insertAdjacentHTML( "beforeend", `<a class="link3" href="http://127.0.0.1:9000/directors">Click on this link to acces the directors page</a>`);
      rootElement.insertAdjacentHTML( "beforeend", `<a class="link4" href="http://127.0.0.1:9000/writers">Click on this link to acces the writers page</a>`);
      rootElement.insertAdjacentHTML( "beforeend", `<a class="link5" href="http://127.0.0.1:9000/genres">Click on this link to acces the movies sorted by genre page</a>`);
      document.body.style.backgroundColor = rgb(174, 89, 235);
  }

  // Write your JavaScript code before this line
};

window.addEventListener("load", loadEvent);
