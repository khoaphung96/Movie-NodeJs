const Movies = require("../models/Movies");
const Genres = require("../models/Genre");
const paginate = require("../util/paging");

exports.getTrendingMovie = (req, res, next) => {
  const page = req.query.page || 1;

  res.status(200).json(listMoviesSortOrderByKey(page, "popularity"));
};

exports.getTopRated = (req, res, next) => {
  const page = req.query.page || 1;

  res.status(200).json(listMoviesSortOrderByKey(page, "vote_average"));
};

exports.getMovieByGenre = (req, res, next) => {
  const page = req.query.page || 1;
  const genre = req.query.genre;
  const genres = Genres;

  const checkGenre = genres.find((item) => item.name === genre);

  if (!genre) {
    return res.status(400).json({ message: "Not found gerne parram" });
  }

  if (!checkGenre) {
    return res.status(404).json({ message: "Not found that gerne id" });
  }

  if (checkGenre) {
    const filterMovies = Movies.filter((item) =>
      item.genre_ids.includes(checkGenre.id)
    );

    const pageSize = 20;

    const result = paginate(filterMovies, pageSize, page);

    const totalPage = Math.ceil(filterMovies.length / pageSize);

    return res
      .status(200)
      .json({ result, page, totalPage, genre_name: checkGenre.name });
  }
};

// exports.getActionMovies = (req, res, next) => {};

// exports.getComedyMovies = (req, res, next) => {};

// exports.getHorrorMovies = (req, res, next) => {};

// exports.getRomanceMovies = (req, res, next) => {};

// exports.getDocumentaries = (req, res, next) => {};

const listMoviesSortOrderByKey = (page, key) => {
  const sortMovies = Movies.sort((a, b) => b[key] - a[key]);

  const pageSize = 20;

  const result = paginate(sortMovies, pageSize, page);

  const totalPage = Math.ceil(sortMovies.length / pageSize);

  return { result, page, totalPage };
};
