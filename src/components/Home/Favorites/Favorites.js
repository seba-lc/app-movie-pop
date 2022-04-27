import { useContext } from 'react';
import UserContext from '../../../context/Users/UserContext';
import './Favorites.css';

const Favorites = ({handleClick}) => {
  const { favObjectMovies, auth } = useContext(UserContext);

  return (
    <div className='d-flex flex-wrap'>
      {
        auth ? (
          favObjectMovies.length !== 0 ? (
            favObjectMovies.map((item) => (
              <div key={item.show.id} className="m-3">
                <div className="movie-box d-flex flex-column" onClick={() => handleClick(item)}>
                  <span>{item.show.name}</span>
                  <span>ID: {item.show.id}</span>
                </div>
              </div>
            ))
          ) : <div>No tiene películas favoritas hasta el momento</div>
        ) : <div>Debe Iniciar Sesión para ver las películas favoritas</div>
      }
    </div>
  );
};

export default Favorites;