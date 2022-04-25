import './Favorites.css';

const Favorites = ({handleClick}) => {
  return (
    <>
      <span>Si no hay películas favoritas dejo un mensaje que todavía el usuario no tiene películas favoritas</span>
      <div className='d-flex flex-wrap'>
        <div className="movie-box" onClick={handleClick}>Pelicula de la lista de favoritos</div>
        <div className="movie-box" onClick={handleClick}>Pelicula de la lista de favoritos</div>
        <div className="movie-box" onClick={handleClick}>Pelicula de la lista de favoritos</div>
      </div>
    </>
  );
};

export default Favorites;