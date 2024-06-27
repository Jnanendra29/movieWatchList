import React from "react";
import { useDispatch } from "react-redux";
import { deleteMovie, toggleWatchedMovie } from "../redux/actions/actions";

const MovieList = ({ movies, setSelectedMovie, setToggleRate, toggleRate }) => {
  const dispatch = useDispatch();


  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie._id} className="movie-card">
          <span style={{ fontSize: "1.25rem", fontWeight: "bolder" }}>
            {movie.title}
          </span>
          <img src={movie.imageUrl} alt={movie.title} />
          <span>{movie.description}</span>
          <span>Released - {movie.releaseYear}</span>
          <span>Genre - {movie.genre}</span>
          <button
            onClick={() => {
              setSelectedMovie(movie);
              setToggleRate(!toggleRate);
            }}
          >
            Rate and Review
          </button>
          <button onClick={() => dispatch(deleteMovie(movie._id))}>
            Delete
          </button>
          <button onClick={() => dispatch(toggleWatchedMovie(movie._id))}>
            {movie.watched ? "Mark as Unwatched" : "Mark as Watched"}
          </button>
          <span>{movie.rating}</span>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
