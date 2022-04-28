import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../context/Users/UserContext';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMagnifyingGlass, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Header = ({hideHeader}) => {
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(false);
  const navigate = useNavigate();
  const [scrollTop, setScrollTop] = useState(true);

  const { auth, getAuth, logout, bringFavoriteMovies, favObjectMovies } = useContext(UserContext);

  const handleClick = () => {
    if(auth){
      logout()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sesión Cerrada',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  const selectInput = () => {
    if(location.pathname === '/home'){
      document.getElementById('search-input').select();
    }else{
      navigate('/home');
      setTimeout(() => {
        document.getElementById('search-input').select();
      }, 500)
    }
  }

  const handleScroll = (e) => {
    if(window.scrollY !== 0){
      setScrollTop(false)
    }else{
      setScrollTop(true)
    }
  }

  useEffect(() => {
    if(!auth){
      getAuth();
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if(auth && favObjectMovies.length === 0){
      const errorFavMovies = bringFavoriteMovies();
      setErrors(errorFavMovies)
    }
    setTimeout(() => {
      setShowHeader(true)
    }, 7800)
  }, [auth])

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      console.log(errors);
    }
  }, [errors])

  return (
    <div className={`${hideHeader ? 'd-none' : null} header-style d-flex align-items-center ${location.pathname === '/' ? (showHeader ? 'visible bg-transparent' : 'invisible bg-transparent') : null} ${scrollTop ? 'border-bottom border-transparent' : 'border-dark border-bottom'}`}>
      <div className='ms-5'>
        <Link to="/" className={`text-light border rounded-pill py-1 px-2 text-decoration-none pointer ${auth ? 'd-none' : (location.pathname === '/' ? 'd-none' : null)}`}>REGISTRATE</Link>
      </div>
      <div className='ms-auto me-5'>
        <Link to="/home" className='m-3'><FontAwesomeIcon icon={faHome} className="text-light iconSize" /></Link>
        <a className='m-3 text-decoration-none pointer' onClick={selectInput}><FontAwesomeIcon icon={faMagnifyingGlass} className="text-light iconSize" /></a>
        <span className={auth ? (location.pathname === '/' ? 'd-none' : 'logout-style') : 'd-none'} onClick={handleClick}><FontAwesomeIcon icon={faArrowRightFromBracket} className="text-light iconSize ps-3" /></span>
      </div>
    </div>
  );
};

export default Header;