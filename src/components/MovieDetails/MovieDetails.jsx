import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function MovieDetail () {
    const movie = useSelector(store => store.selectedMovie);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type:'FETCH_MOVIE_DETAILS', payload: id });
    }, [id]);

    return (
        <div>
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title} />
            <p>{movie.description}</p>
        </div>
    )
}

export default MovieDetail;