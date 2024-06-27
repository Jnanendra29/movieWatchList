// src/components/ReviewForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reviewMovie } from '../redux/actions/actions';

const ReviewForm = ({ movieId }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reviewMovie(movieId, review));
    setReview('');
  };

  return (
    <form onSubmit={handleSubmit} className='rate-and-review'>
      <textarea
        placeholder="Write a review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
