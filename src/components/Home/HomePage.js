import { useEffect, useState } from 'react';
import { axiosMovieClient } from '../../config/axiosConfig';
import AllMovies from './AllMovies/AllMovies';
import Favorites from './Favorites/Favorites';
import './HomePage.css'
import MovieContainer from './MovieContainer/MovieContainer';

const HomePage = () => {
  const [showMovie, setShowMovie] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState('star%20wars')

  const handleClick = (item) => {
    setShowMovie(true);
    const modal = document.getElementById('modal-id');
    modal.classList.add('modal_show');
    document.body.classList.add('modal_overflow');
    console.log(item.show);
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

  return (
    <>
      <div className='homePage-style py-5'>
        <input type="text" placeholder='Buscar: (Ej: Star Wars)' onKeyUp={handleKeyUp} id="search-input" />
        <br />
        <button onClick={showFavoritesFunction}>{showFavorites ? 'Todas las películas' : 'Peliculas Favoritas'}</button>
        <h6>Peliculas / Peliculas favoritas</h6>
        <br />
        <span>Utilizar spinners para cargar estas películas</span>
        <hr />
        {
          showFavorites ? <Favorites handleClick={handleClick} movies={movies}/> : (
            <AllMovies handleClick={handleClick} movies={movies}/>
          )
        }
        
      </div>
      <MovieContainer showMovie={showMovie} setShowMovie={setShowMovie} />
    </>
  );
};

export default HomePage;