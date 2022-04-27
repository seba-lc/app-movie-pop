import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserContext from '../../context/Users/UserContext';
import './Header.css'

const Header = () => {
  const [errors, setErrors] = useState({});
  const location = useLocation();

  const { auth, getAuth, logout, bringFavoriteMovies, favObjectMovies } = useContext(UserContext);

  const handleClick = () => {
    if(auth){
      logout()
      console.log('Sesion cerrada');
    }
  }

  useEffect(() => {
    if(!auth){
      getAuth();
    }
  }, [])

  useEffect(() => {
    if(auth && favObjectMovies.length === 0){
      const errorFavMovies = bringFavoriteMovies();
      setErrors(errorFavMovies)
    }
  }, [auth])

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      console.log(errors);
    }
  }, [errors])

  return (
    <div className={`bg-transparent header-style d-flex ${location.pathname === '/' ? 'invisible' : null}`}>
      <div className='ms-5'>
        <Link to="/">Landing</Link>
      </div>
      <div className='ms-auto me-5'>
        <Link to="/home" className='m-3'>Casita</Link>
        <Link to="/home" className='m-3'>Lupita</Link>
        <button onClick={handleClick}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Header;