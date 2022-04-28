import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { axiosMovieClient } from '../../config/axiosConfig';
import AllMovies from './AllMovies/AllMovies';
import Favorites from './Favorites/Favorites';
import './HomePage.css'
import MovieContainer from './MovieContainer/MovieContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClapperboard } from '@fortawesome/free-solid-svg-icons';

const HomePage = ({setHideHeader}) => {
  const [showMovie, setShowMovie] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState('star%20wars');
  const [movieSelected, setMovieSelected] = useState(null)

  const handleClick = (item) => {
    setShowMovie(true);
    const modal = document.getElementById('modal-id');
    modal.classList.add('modal_show');
    document.body.classList.add('modal_overflow');
    setMovieSelected(item);
  }

  const showFavoritesFunction = () => {
    if(showFavorites){
      setShowFavorites(false);
    }else{
      setShowFavorites(true);
      document.getElementById('search-input').value = '';
    };
  }

  const bringMovies = async () => {
    try {
      const response = await axiosMovieClient.get(`/search/shows?q=${search}`);
      if(response.data.length !== 0){
        setMovies(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleKeyUp = (e) => {
    if(showFavorites){
      setShowFavorites(false)
    }
    setSearch(e.target.value.trim())
    if(e.target.value === ''){
      setSearch('star%20wars')
    }
  }

  useEffect(() => {
    return () => {
      const modal = document.getElementById('modal-id');
      modal.classList.remove('modal_show');
      document.body.classList.remove('modal_overflow');
    }
  }, [])

  useEffect(() => {
    bringMovies();
  }, [search])

  useEffect(() => {
    setSearch('star%20wars');
  }, [showFavorites])

  useEffect(() => {
    setHideHeader(showMovie)
  }, [showMovie])

  return (
    <>
      <div className='homePage-style py-5'>
        <Form.Group controlId='search-input'>
          <Form.Control className='search-style' type="text" placeholder='Buscar: (Ej: Star Wars)' onKeyUp={handleKeyUp} />
        </Form.Group>
        <div className={`border my-3 d-inline-block px-2 py-1 pointer ${showFavorites ? 'text-danger border-danger' : 'text-warning border-warning'}`} onClick={showFavoritesFunction}>
          {
            showFavorites ? <span><FontAwesomeIcon icon={faClapperboard} /></span> : <span><FontAwesomeIcon icon={faStar} /></span>
          }
          <span className='ps-2'>{showFavorites ? 'Ver Todas las películas' : 'Ver Peliculas Favoritas'}</span>
        </div>
        <hr />
        <h4 className='text-center'>{showFavorites ? 'PELICULAS FAVORITAS' : 'RESULTADOS BUSQUEDA'}</h4>
        {
          showFavorites ? <Favorites handleClick={handleClick} movies={movies}/> : (
            <AllMovies handleClick={handleClick} movies={movies}/>
          )
        }
        
      </div>
      <MovieContainer showMovie={showMovie} setShowMovie={setShowMovie} movieSelected={movieSelected} setMovieSelected={setMovieSelected} />
    </>
  );
};

export default HomePage;