import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
  yield takeEvery('FETCH_GENRES', fetchGenres);
  yield takeEvery('ADD_MOVIE', addMovie);
}

function* fetchMovieDetails(action) {
  try {
    const movie = yield axios.get(`/api/movies/${action.payload}`);
    yield put({ type: 'SET_MOVIE_DETAILS', payload: movie.data });
    const genres = yield axios.get(`/api/genres/${action.payload}`);
    yield put ({ type: 'SET_GENRES', payload: genres.data });
  } catch (err) {
    console.log(err);
  }
}

// Fetch genres
function* fetchGenres() {
  try {
    const response = yield call(axios.get, '/api/genres');
    yield put({ type: 'SET_GENRES', payload: response.data });
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
}

// Add movie
function* addMovie(action) {
  try {
    yield call(axios.post, '/api/movies', action.payload);
    yield put({ type: 'FETCH_MOVIES' }); 
  } catch (error) {
    console.error('Error adding movie:', error);
  }
}
function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

const selectedMovie = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MOVIE_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    selectedMovie,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
