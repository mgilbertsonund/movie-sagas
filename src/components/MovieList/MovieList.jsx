import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';

function MovieList() {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  const displayMovie = (movieToDisplay) => {
    console.log(movieToDisplay);
    dispatch({ type: 'SET_MOVIE_DETAILS', payload: movieToDisplay })
  }

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {/* loop over array, and for each movie, display on DOM */}
        {movies.map(movie => {
          return (
            <div data-testid='movieItem' key={movie.id}>
              <h3>{movie.title}</h3>
              <img onClick={(event) => displayMovie(movie)} src={movie.poster} alt={movie.title}/>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
