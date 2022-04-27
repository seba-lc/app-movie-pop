import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/Users/UserContext";

const ButtonFav = ({data}) => {
  const { postFavMovie } = useContext(UserContext);
  const [errors, setErrors] = useState({})

  const handleClick = async () => {
    const postErrors = await postFavMovie(data);
    setErrors(postErrors);
    if(Object.keys(postErrors).length === 0){
      console.log('Pelicula añadida a Favoritos');
    }
  }

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      console.log(errors);
    }
  }, [errors])

  return <button onClick={handleClick}>Añadir a Favoritos</button>;
};

export default ButtonFav;

