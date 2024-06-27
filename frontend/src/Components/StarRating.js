// src/components/StarRating.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { rateMovie } from '../redux/actions/actions';

const StarRating = ({ movieId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    dispatch(rateMovie(movieId, rate));
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onClick={() => handleRating(star)}>
          {star <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
