const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "genreList.json"
);

const genreRaw = fs.readFileSync(p, "utf8");
const genres = JSON.parse(genreRaw);

module.exports = genres;
