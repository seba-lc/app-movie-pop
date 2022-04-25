import Movie from '../Movie/Movie';
import './MovieContainer.css'

const MovieContainer = ({showMovie, setShowMovie}) => {
  return (
    <div className={`movieContainer-style ${showMovie ? 'movieContainer_show' : null}`}>
      <Movie setShowMovie={setShowMovie} />
    </div>
  );
};

export default MovieContainer;