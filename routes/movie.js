const path = require("path");

const express = require("express");

const movieController = require("../controllers/movie");

const router = express.Router();

router.get("/trendingMovie", movieController.getTrendingMovie);

// router.get("/fetchNetflixOriginals", movieController.getNetflixOriginals);

router.get("/fetchTopRated", movieController.getTopRated);

router.get("/fetchMovieByGenre", movieController.getMovieByGenre);

// router.get("/fetchActionMovies", movieController.getActionMovies);

// router.get("/fetchComedyMovies", movieController.getComedyMovies);

// router.get("/fetchHorrorMovies", movieController.getHorrorMovies);

// router.get("/fetchRomanceMovies", movieController.getRomanceMovies);

// router.get("/fetchDocumentaries", movieController.getDocumentaries);

module.exports = router;
