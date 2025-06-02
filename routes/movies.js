const express = require("express");
const axios = require("axios");
const auth = require("../middleware/authMiddleware");
const Favorite = require("../models/Favorite");

const router = express.Router();

// Search TMDB
router.get("/search", async (req, res) => {
  const { query } = req.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`;

  const response = await axios.get(url);
  res.json(response.data.results);
});

// Save favorite
router.post("/favorite", auth, async (req, res) => {
  const { movieId, title, poster } = req.body;
  const favorite = new Favorite({ userId: req.user.id, movieId, title, poster });
  await favorite.save();
  res.json(favorite);
});

// Get favorites
router.get("/favorites", auth, async (req, res) => {
  const favorites = await Favorite.find({ userId: req.user.id });
  res.json(favorites);
});

module.exports = router;
