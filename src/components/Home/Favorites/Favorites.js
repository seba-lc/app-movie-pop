import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../context/Users/UserContext';
import './Favorites.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { axiosBackendClient } from '../../../config/axiosConfig';
import Swal from 'sweetalert2';

const Favorites = ({handleClick}) => {
  const { favObjectMovies, auth, favMovies, deleteFav, userLogged } = useContext(UserContext);
  const [errors, setErrors] = useState({});

  const deleteFavMovie = async (item) => {
    const dataDB = {
      user: userLogged.user,
      favMovies: favMovies.filter(fav => fav !== item.show.id.toString())
    }
    try {
      const response = await axiosBackendClient.post('/users/deletefav', dataDB);
      if(response.status === 200){
        deleteFav(item.show.id);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pelicula Eliminada de Favoritos',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      setErrors({servidor: 'Error al borrar el archivo, intentelo nuevamente'})
    }
  }

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: errors.servidor,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }, [errors])

  return (
    <div className='d-flex flex-wrap justify-content-center'>
      {
        auth ? (
          favObjectMovies.length !== 0 ? (
            favObjectMovies.map((item, index) => (
              <div key={index} className="p-4 m-1 d-flex flex-column align-items-center justify-content-between shadow">
                <div className="movie-box d-flex flex-column justify-content-end text-center border border-dark pb-3" style={{backgroundImage: `url(${item.show.image?.medium})`}} onClick={() => handleClick(item)}>
                  {item.show?.image === null ? 'IMAGEN NO DISPONIBLE' : null}
                </div>
                <div className='title-style text-center my-1'>{item.show.name}</div>
                <div className='pointer mt-1' onClick={() => deleteFavMovie(item)}>
                  <FontAwesomeIcon icon={faTrash} className="trashIcon" />
                </div>
              </div>
            ))
          ) : <div className='text-center w-100 mt-5'>No tiene películas favoritas hasta el momento</div>
        ) : <div className='text-center w-100 mt-5'>Debe Iniciar Sesión para poder seleccionar películas favoritas</div>
      }
    </div>
  );
};

export default Favorites;