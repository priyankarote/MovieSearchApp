// src/MovieCard.js
import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick}>
      <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} className='card-img' alt={movie.Title} />
      <h3 className='head-title'>{movie.Title}</h3>
      <p className='para-year'>{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
