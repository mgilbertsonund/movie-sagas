import { Route, HashRouter as Router, Link } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import MovieDetail from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add-movie">Add Movie</Link>
        </nav>
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route exact path="/detail/:id">
          <MovieDetail />
        </Route>
        <Route exact path="/add-movie">
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}

export default App;

