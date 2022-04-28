import Movie from '../Movie/Movie';
import './MovieContainer.css'

const MovieContainer = ({showMovie, setShowMovie, movieSelected}) => {
  return (
    <div className={`movieContainer-style ${showMovie ? 'movieContainer_show' : null}`}>
      <Movie showMovie={showMovie} setShowMovie={setShowMovie} movieSelected={movieSelected} />
    </div>
  );
};

export default MovieContainer;