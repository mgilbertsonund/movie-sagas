import { useDispatch, useSelector } from "react-redux";


function MovieDetail () {
    const movie = useSelector(store => store.selectedMovie);

    return (
        <div>
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title} />
            <p>{movie.description}</p>
        </div>
    )
}

export default MovieDetail;