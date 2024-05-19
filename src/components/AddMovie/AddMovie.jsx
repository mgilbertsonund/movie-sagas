import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddMovie() {
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [description, setDescription] = useState('');
  const [genreIds, setGenreIds] = useState([]);

  const dispatch = useDispatch();
  const genres = useSelector(store => store.genres);

  useEffect(() => {
    // Dispatch action to fetch genres when component mounts
    dispatch({ type: 'FETCH_GENRES' });
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_MOVIE',
      payload: { title, poster, description, genre_ids: genreIds }
    });
    // Clear the form after submission
    setTitle('');
    setPoster('');
    setDescription('');
    setGenreIds([]);
  };

  const handleGenreChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setGenreIds(selectedOptions);
  };

  return (
    <div>
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="poster">Poster URL:</label>
          <input
            type="text"
            id="poster"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="genre">Genres:</label>
          <select
            id="genre"
            multiple
            value={genreIds}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;
