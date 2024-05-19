import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function MovieDetail () {
    const movie = useSelector(store => store.selectedMovie);
    const genres = useSelector(store => store.genres);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type:'FETCH_MOVIE_DETAILS', payload: id });
    }, [id]);

    return (
        <div>
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title} />
            <Link to={`/edit/${movie.id}`}>Edit</Link>
            <p>{movie.description}</p>
            <h4>Movie Genres</h4>
            <ul>
                {
                    genres.map(genreToDisplay => <li>{genreToDisplay.name}</li>)
                }
            </ul>
        </div>
    )
}

export default MovieDetail;