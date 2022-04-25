import './AllMovies.css';

const AllMovies = ({handleClick, movies}) => {
  return (
    <div className='d-flex flex-wrap'>
      {
        movies?.map(item => (
          <div key={item.show.id} className="movie-box d-flex flex-column" onClick={() => handleClick(item)}>
            <span>{item.show.name}</span>
            <span>ID: {item.show.id}</span>
            <span>Añadir a favoritos</span>
          </div>
        ))
      }
    </div>
  );
};

export default AllMovies;