import React from 'react';

const MovieModal = ({ movie, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <div className="modal-content_One">
        <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} className='img-popup' alt={movie.Title} />
        </div>
         <div className="modal-content_Two">
         <button className="close-button" onClick={onClose}>
        <i className="fa fa-times"></i>
        </button>
        <h2 className='movie-title'>{movie.Title} ({movie.Year})</h2>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Plot summary:</strong> {movie.Plot}</p>
        <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
