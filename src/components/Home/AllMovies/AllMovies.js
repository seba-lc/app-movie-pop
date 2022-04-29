import ButtonFav from '../ButtonFav';
import './AllMovies.css';

const AllMovies = ({handleClick, movies}) => {
  return (
    <div className='d-flex flex-wrap movie-ubication'>
      {
        movies?.map(item => (
          <div key={item.show.id} className="p-4 m-1 d-flex flex-column align-items-center justify-content-between shadow">
            <div className="movie-box d-flex flex-column justify-content-end text-center border border-dark pb-3" style={{backgroundImage: `url(${item.show.image?.medium})`}} onClick={() => handleClick(item)}>
              {item.show?.image === null ? 'IMAGEN NO DISPONIBLE' : null}
            </div>
            <div className='title-style text-center my-1'>{item.show.name}</div>
            <ButtonFav data={item} />
          </div>
        ))
      }
    </div>
  );
};

export default AllMovies;