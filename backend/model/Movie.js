const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  watched: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
