const Movies = require("../models/Movies");
const paginate = require("../util/paging");
const Genres = require("../models/Genre");

exports.getSearchMovie = (req, res, next) => {
  const keyword = req.body.searchInput.toLowerCase();
  const genre = req.body.genreSearchSelect;
  const mediaType = req.body.mediaTypeSearchSelect;
  const language = req.body.languageSearchSelect;
  const year = req.body.yearSearchInput;

  const checkGenre = Genres.find((item) => item.name === genre);

  const searchMovie = Movies.filter((item) => {
    if (item.title) {
      return (
        item.title.toLowerCase().includes(keyword) ||
        item.overview.toLowerCase().includes(keyword)
      );
    }

    if (item.name) {
      return (
        item.name.toLowerCase().includes(keyword) ||
        item.overview.toLowerCase().includes(keyword)
      );
    }
  })
    .filter((item) => {
      if (genre === "Default") {
        return item.genre_ids;
      }

      return item.genre_ids.includes(checkGenre.id);
    })
    .filter((item) => {
      if (mediaType === "Default") {
        return item.media_type;
      }

      return item.media_type === mediaType;
    })
    .filter((item) => {
      if (language === "Default") {
        return item.original_language;
      }

      return item.original_language === language;
    })
    .filter((item) => {
      if (year === "") {
        return item;
      }

      if (item.release_date) {
        return item.release_date.includes(year);
      }

      if (item.first_air_date) {
        return item.first_air_date.includes(year);
      }
    });

  if (searchMovie.length === 0) {
    return res.status(400).json({ message: "No Movie Found With Keyword" });
  }

  const page = req.query.page || 1;

  const pageSize = 20;

  const result = paginate(searchMovie, pageSize, page);

  const totalPage = Math.ceil(searchMovie.length / pageSize);

  res.status(200).json({ result, page, totalPage });
};
