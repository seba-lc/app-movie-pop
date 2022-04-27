import Movie from '../Movie/Movie';
import './MovieContainer.css'

const MovieContainer = ({showMovie, setShowMovie, movieSelected, setMovieSelected}) => {
  return (
    <div className={`movieContainer-style ${showMovie ? 'movieContainer_show' : null}`}>
      <Movie setShowMovie={setShowMovie} movieSelected={movieSelected} setMovieSelected={setMovieSelected} />
    </div>
  );
};

export default MovieContainer;