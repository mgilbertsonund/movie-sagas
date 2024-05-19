import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css';

function MovieList() {

  const dispatch = useDispatch();
  const history = useHistory();
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  const displayMovie = (movieToDisplay) => {
    console.log(movieToDisplay);
    history.push(`/detail/${movieToDisplay.id}`);
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
