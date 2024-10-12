import * as fs from "node:fs";

const movieDB = {
  professionals: [],
  movies: [],
  genres: [],
};

//write you code after this line

const rawdata = fs.readFileSync("data.json", { encoding: "utf8" });
const data = JSON.parse(rawdata);
let count = 1;
for (let movie of data.movies) {
  movie.genres.forEach((genre) => {
    let genreExists = movieDB.genres.find((g) => g.name === genre);
    if (!genreExists) {
      movieDB.genres.push({
        id: movieDB.genres.length + 1,
        name: genre,
      });
    }
  });
  movie.writers.forEach((writer) => {
    let index = movieDB.professionals.findIndex(function (obj) {
      return obj.name === writer;
    });
    if (index === -1) {
      movieDB.professionals.push({
        id: count++,
        name: writer,
        roles: ["writer"],
      });
    } else if (
      index > -1 &&
      !movieDB.professionals[index].roles.includes("writer")
    ) {
      movieDB.professionals[index].roles.push("writer");
    }
  });
  movie.actors.forEach((actor) => {
    let index = movieDB.professionals.findIndex(function (obj) {
      return obj.name === actor;
    });
    if (index === -1) {
      movieDB.professionals.push({
        id: count++,
        name: actor,
        roles: ["actor"],
      });
    } else if (
      index > -1 &&
      !movieDB.professionals[index].roles.includes("actor")
    ) {
      movieDB.professionals[index].roles.push("actor");
    }
  });
  movie.directors.forEach((director) => {
    let index = movieDB.professionals.findIndex(function (obj) {
      return obj.name === director;
    });
    if (index === -1) {
      movieDB.professionals.push({
        id: count++,
        name: director,
        roles: ["director"],
      });
    } else if (
      index > -1 &&
      !movieDB.professionals[index].roles.includes("director")
    ) {
      movieDB.professionals[index].roles.push("director");
    }
  });

  movie.writers.forEach((writer, index) => {
    let foundObj = movieDB.professionals.find(function (obj) {
      return obj.name === writer;
    });
    movie.writers.splice(index, 1, foundObj.id);
  });
  movie.actors.forEach((actor, index) => {
    let foundObj = movieDB.professionals.find(function (obj) {
      return obj.name === actor;
    });
    movie.actors.splice(index, 1, foundObj.id);
  });
  movie.directors.forEach((director, index) => {
    let foundObj = movieDB.professionals.find(function (obj) {
      return obj.name === director;
    });
    movie.directors.splice(index, 1, foundObj.id);
  });
  movieDB.movies.push(movie);
}


//write your code brefore this line

export { movieDB };
