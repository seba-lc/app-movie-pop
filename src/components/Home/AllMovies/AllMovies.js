import ButtonFav from '../ButtonFav';
import './AllMovies.css';

const AllMovies = ({handleClick, movies}) => {
  return (
    <div className='d-flex flex-wrap'>
      {
        movies?.map(item => (
          <div key={item.show.id} className="m-3">
            <div className="movie-box d-flex flex-column" onClick={() => handleClick(item)}>
              <span>{item.show.name}</span>
              <span>ID: {item.show.id}</span>
            </div>
            <ButtonFav data={item} />
          </div>
        ))
      }
    </div>
  );
};

export default AllMovies;