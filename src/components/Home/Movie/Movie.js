import './Movie.css';

const Movie = ({setShowMovie}) => {
  const handleClick = () => {
    setShowMovie(false);
    const modal = document.getElementById('modal-id');
    modal.classList.remove('modal_show');
    document.body.classList.remove('modal_overflow');
  }

  return (
    <div className='movie-style d-flex flex-column align-items-center'>
      <button onClick={handleClick}>X</button>
      <span className='border border-info p-4'>pelicula con clasificación de estrellas dentro</span>
      <span>Titulo</span>
      <span>Sinopsis</span>
      <span>Añadir a favoritos</span>
      <span className='px-2 py-5 border border-light'>Reseñas de los usuarios</span>

    </div>
  );
};

export default Movie;