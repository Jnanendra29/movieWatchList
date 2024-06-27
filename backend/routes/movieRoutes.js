const express = require("express");
const {
  getMovies,
  addMovie,
  editMovie,
  deleteMovie,
  toggleWatched,
  rateMovie,
} = require("../controller/movieController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/movies", auth, getMovies);
router.post("/movies", auth, addMovie);
router.put("/movies/:id", auth, editMovie);
router.delete("/movies/:id", auth, deleteMovie);
router.patch("/movies/:id/status", auth, toggleWatched);
router.patch("/movies/:id/rate", auth, rateMovie);

module.exports = router