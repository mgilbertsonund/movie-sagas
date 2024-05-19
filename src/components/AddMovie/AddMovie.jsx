import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

function AddMovie() {
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [description, setDescription] = useState('');
  const [genreIds, setGenreIds] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();
  const genres = useSelector(store => store.genres);

 useEffect(() => {
  if (id) {
    axios.get(`/api/movies/${id}`).then(response => {
      const movie = response.data;
      if (movie) {
        setTitle(movie.title);
        setPoster(movie.poster);
        setDescription(movie.description);
        if (movie.genres) {
          setGenreIds(movie.genres.map(genre => genre.id));
        }
      }
    }).catch(error => {
        console.log(alert);
        alert('Something went wrong');
    })
  }
  dispatch({ type: 'FETCH_GENRES' });
}, [dispatch, id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
        dispatch({ type: 'EDIT_MOVIE', payload: { id, title, poster, description, genre_ids: genreIds }, history })
    }
    else {
        dispatch({ type: 'ADD_MOVIE', payload: { id, title, poster, description, genre_ids: genreIds }, history });
    }
    setTitle('');
    setPoster('');
    setDescription('');
    setGenreIds([]);
  };

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setGenreIds([...genreIds, genreId]);
    } else {
      setGenreIds(genreIds.filter(id => id !== genreId));
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Movie' : 'Add a New Movie'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* {id && <p>Current title: {title}</p>} */}
        </div>
        <div>
          <label htmlFor="poster">Poster URL:</label>
          <input
            type="text"
            id="poster"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
          {/* {id && <p>Current poster URL: {poster}</p>} */}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {/* {id && <p>Current description: {description}</p>} */}
        </div>
        <div>
          <h3>Genres:</h3>
          {genres.map((genre) => (
            <div key={genre.id}>
              <label>
                <input
                  type="checkbox"
                  value={genre.id}
                  onChange={handleGenreChange}
                  checked={genreIds.includes(genre.id.toString())}
                />
                {genre.name}
              </label>
            </div>
          ))}
        </div>
        <button type="submit">{id ? 'Update Movie' : 'Add Movie'}</button>
      </form>
    </div>
  );
}

export default AddMovie;
