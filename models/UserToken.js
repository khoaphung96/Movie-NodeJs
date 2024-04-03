const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "userToken.json"
);

const usersRaw = fs.readFileSync(p, "utf8");
const users = JSON.parse(usersRaw);

module.exports = users;
