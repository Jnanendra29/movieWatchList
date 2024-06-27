// src/components/MovieForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie, editMovie } from "../redux/actions/actions";

const MovieForm = ({ selectedMovie, setSelectedMovie }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseYear: "",
    genre: "",
    imageUrl: "",
  });

  const { title, description, releaseYear, genre, imageUrl } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMovie) {
      dispatch(editMovie(formData));
    } else {
      dispatch(addMovie(formData));
    }
    setFormData({
      title: "",
      description: "",
      releaseYear: "",
      genre: "",
      imageUrl: "",
    });
    setSelectedMovie(null);
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <div>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Description"
          name="description"
          value={description}
          onChange={onChange}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Release Year"
          name="releaseYear"
          value={releaseYear}
          onChange={onChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Genre"
          name="genre"
          value={genre}
          onChange={onChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Image URL"
          name="imageUrl"
          value={imageUrl}
          onChange={onChange}
        />
      </div>
      <button type="submit">
        {selectedMovie ? "Edit Movie" : "Add Movie"}
      </button>
    </form>
  );
};

export default MovieForm;
