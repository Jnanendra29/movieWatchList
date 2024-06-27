const Movie = require("../model/Movie");

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user._id });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const { title, description, releaseYear, genre, imageUrl } = req.body;
    let movie = new Movie({
      title,
      description,
      releaseYear,
      genre,
      imageUrl,
      user: req.user._id,
    });
    movie = await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.editMovie = async (req, res) => {
  const { id } = req.params;
  const { title, description, releaseYear, genre, imageUrl } = req.body;

  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, description, releaseYear, genre, imageUrl },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findOneAndDelete({ _id: id, user: req.user._id });

    if (!movie) {
      return res.status(404).json({ message: "Novie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.toggleWatched = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findOne({ _id: id, user: req.user._id });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    movie.watched = !movie.watched;
    await movie.save();

    res.status(200).json({ movie });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.rateMovie = async (req, res) => {
  const { id } = req.params;
  const { rating, review } = req.body;

  try {
    const movie = await Movie.findOne({ _id: id, user: req.user._id });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    movie.rating = rating;
    movie.review = review;
    await movie.save();

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
