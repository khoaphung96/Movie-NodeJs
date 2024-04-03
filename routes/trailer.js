const path = require("path");

const express = require("express");

const trailerController = require("../controllers/trailer");

const router = express.Router();

router.post("/trailer", trailerController.getTrailer);

module.exports = router;
