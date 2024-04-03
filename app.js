const path = require("path");
const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

const movieRoutes = require("./routes/movie");
const trailerRoutes = require("./routes/trailer");
const searchRoutes = require("./routes/search");
const auth = require("./middleware/auth");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(auth, movieRoutes);
app.use(auth, trailerRoutes);
app.use(auth, searchRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not Found!" });
});

app.listen(5000);
