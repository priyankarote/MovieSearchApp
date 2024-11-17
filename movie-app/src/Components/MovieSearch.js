import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const apiKey = 'ca82796'; 

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=batman&apikey=${apiKey}`);
        if (response.data.Response === 'True') {
          setMovies(response.data.Search);
        } else {
          setMovies([]);
        }
      } catch (err) {
        setError('Error fetching popular movies');
      } finally {
        setLoading(false);
      }
    };
    fetchPopularMovies();
  }, []);

  const searchMovies = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError('No movies found');
      }
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = async (id) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);

      setSelectedMovie(response.data);
    } catch (err) {
      setError('Error fetching movie details');
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <form className='search-frm' onSubmit={searchMovies}>
        <input
          type="text"
          className='search'
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className='submit-btn' disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
          <i className="fa fa-search"></i> 
        </button>
      </form>

      {error && <p>{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onClick={() => handleMovieClick(movie.imdbID)} />
        ))}
      </div>

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </div>
  );
};

export default MovieSearch;
