// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  addMovie,
  editMovie,
  deleteMovie,
  toggleWatchedMovie,
} from "../redux/actions/actions";
import MovieForm from "../Components/MovieForm";
import MovieList from "../Components/MovieList";
import StarRating from "../Components/StarRating";
import ReviewForm from "../Components/ReviewForm";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleRate,setToggleRate] = useState(false)

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleAddMovie = (movie) => {
    dispatch(addMovie(movie));
  };

  const handleEditMovie = (movie) => {
    dispatch(editMovie(movie));
  };

  const handleDeleteMovie = (id) => {
    dispatch(deleteMovie(id));
  };

  const handleToggleWatched = (id) => {
    dispatch(toggleWatchedMovie(id));
  };

  // console.log("home",movies)
  const handleToggleForm = () => {
    setToggleForm(!toggleForm);
  };

  const token = localStorage.getItem("token");

  return (
    <>
      {token ? (
        <div className="movie-watch-list">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0px 10px",
            }}
          >
            <h1>Movie Watchlist</h1>{" "}
            <span>
              <button
                style={{
                  backgroundColor: "lavender",
                  borderRadius: "10px",
                  fontSize: "1.05rem",
                }}
                onClick={handleToggleForm}
              >
                {toggleForm ? "Close form" : "Open Form"}
              </button>
            </span>
          </div>
          {toggleForm ? (
            <MovieForm
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
              onSubmit={handleAddMovie}
            />
          ) : undefined}
          <MovieList
            movies={movies}
            setSelectedMovie={setSelectedMovie}
            onDelete={handleDeleteMovie}
            onToggleWatched={handleToggleWatched}
            selectedMovie = {selectedMovie}
            setToggleRate = {setToggleRate}
            toggleRate = {toggleRate}
          />
          {selectedMovie && toggleRate && (
            <div className="rate-review">
              Review for {selectedMovie.title}
              <StarRating movieId={selectedMovie._id} />
              <ReviewForm movieId={selectedMovie._id} />
            </div>
          )}
        </div>
      ) : (
        <>
          <h1>Please Login or Register First</h1>
          <Link
            to="/login"
            style={{ textDecoration: "none", fontSize: "1.25rem" }}
          >
            Login
          </Link>
        </>
      )}
    </>
  );
};

export default Home;
