const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieId: String,
  title: String,
  poster: String,
});

module.exports = mongoose.model("Favorite", favoriteSchema);
