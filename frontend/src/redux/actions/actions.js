export const FETCH_MOVIES = "FETCH_MOVIES";
export const ADD_MOVIE = "ADD_MOVIE";
export const EDIT_MOVIE = "EDIT_MOVIE";
export const DELETE_MOVIE = "DELETE_MOVIE";
export const WATCHED = "WATCHED";
export const RATE_MOVIE = "RATE_MOVIE";
export const REVIEW_MOVIE = "REVIEW_MOVIE";

export const fetchMovies = () => async (dispatch) => {
  const response = await fetch("http://localhost:5000/api/movies", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  // console.log("fetch movies", data)
  dispatch({ type: FETCH_MOVIES, payload: data });
};

export const addMovie = (movie) => async (dispatch) => {
  const response = await fetch("http://localhost:5000/api/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(movie),
  });
  const data = await response.json();
  dispatch({ type: ADD_MOVIE, payload: data });
};

export const editMovie = (movie) => async (dispatch) => {
  const response = await fetch(
    `http://localhost:5000/api/movies/${movie._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(movie),
    }
  );
  const data = await response.json();
  dispatch({ type: EDIT_MOVIE, payload: data });
};

export const deleteMovie = (id) => async (dispatch) => {
  await fetch(`http://localhost:5000/api/movies/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  dispatch({ type: DELETE_MOVIE, payload: id });
};

export const toggleWatchedMovie = (id) => async (dispatch) => {
  const response = await fetch(
    `http://localhost:5000/api/movies/${id}/status`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await response.json();
  dispatch({ type: WATCHED, payload: data });
};

export const rateMovie = (id, rating) => async (dispatch) => {
  const response = await fetch(`http://localhost:5000/api/movies/${id}/rate`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ rating }),
  });
  const data = await response.json();
  dispatch({ type: RATE_MOVIE, payload: data });
};

export const reviewMovie = (id, review) => async (dispatch) => {
  const response = await fetch(
    `http://localhost:5000/api/movies/${id}/rate`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ review }),
    }
  );
  const data = await response.json();
  dispatch({ type: REVIEW_MOVIE, payload: data });
};
