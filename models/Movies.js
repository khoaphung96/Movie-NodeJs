const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "movieList.json"
);

const moviesRaw = fs.readFileSync(p, "utf8");
const movies = JSON.parse(moviesRaw);

module.exports = movies;
