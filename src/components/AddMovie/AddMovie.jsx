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
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;
