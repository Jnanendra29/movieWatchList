import {
  ADD_MOVIE,
  FETCH_MOVIES,
  EDIT_MOVIE,
  DELETE_MOVIE,
  WATCHED,
  RATE_MOVIE,
  REVIEW_MOVIE,
} from "../actions/actions";

const initialState = {
  movies: [],
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case EDIT_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        ),
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie._id !== action.payload),
      };
    case WATCHED:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        ),
      };
    case RATE_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        ),
      };
    case REVIEW_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        ),
      };
    default:
      return state;
  }
};

export default moviesReducer;
