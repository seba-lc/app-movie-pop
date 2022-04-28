import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/Users/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const ButtonFav = ({data}) => {
  const { postFavMovie, favMovies } = useContext(UserContext);
  const [errors, setErrors] = useState({})

  const handleClick = async () => {
    const postErrors = await postFavMovie(data);
    setErrors(postErrors);
    if(Object.keys(postErrors).length === 0){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pelicula añadida a Favoritos',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: errors.user,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }, [errors])

  return <div className="pointer mt-1" onClick={handleClick}>
    <span><FontAwesomeIcon icon={faStar} className={`p-1 ${favMovies.indexOf(data.show.id.toString()) !== -1 ? 'already-fav' : 'fav-btn'}`} /></span>
  </div>;
};

export default ButtonFav;

