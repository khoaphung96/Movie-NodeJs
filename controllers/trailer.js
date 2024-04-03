const Trailer = require("../models/Trailer");

exports.getTrailer = (req, res, next) => {
  const filmId = req.body.id;

  const getTrailerArrById = Trailer.find((item) => item.id === filmId);

  if (!filmId) {
    return res.status(400).json({ message: "Not found film_id parram" });
  }

  if (!getTrailerArrById) {
    return res.status(404).json({ message: "Not found video" });
  }

  if (getTrailerArrById) {
    function comparePublished(a, b) {
      if (a.published_at < b.published_at) {
        return 1;
      }
      if (a.published_at > b.published_at) {
        return -1;
      }
      return 0;
    }

    let result;

    const sortByOffAndYouAndPublish = getTrailerArrById.videos
      .filter((item) => item.official)
      .filter((item) => item.site === "YouTube")
      .sort(comparePublished);

    result = sortByOffAndYouAndPublish.filter(
      (item) => item.type === "Trailer"
    );

    if (result.length === 0) {
      result = sortByOffAndYouAndPublish.filter(
        (item) => item.type === "Teaser"
      );
    }

    return res.status(200).json({ result, message: "Success" });
  }
};
