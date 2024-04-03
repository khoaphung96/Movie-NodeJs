const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "videoList.json"
);

const trailerRaw = fs.readFileSync(p, "utf8");
const trailer = JSON.parse(trailerRaw);

module.exports = trailer;
