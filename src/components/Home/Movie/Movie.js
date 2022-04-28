import { useContext, useEffect, useState } from 'react';
import { axiosBackendClient } from '../../../config/axiosConfig';
import UserContext from '../../../context/Users/UserContext';
import Comments from '../Comments/Comments';
import './Movie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ButtonFav from '../ButtonFav';

const Movie = ({setShowMovie, movieSelected, setMovieSelected}) => {
  const [comment, setComment] = useState({
    message: '',
    characters: 200
  });
  const [errors, setErrors] = useState({});
  const [check, setCheck] = useState(false);
  //tengo que crear un estado que se carge con los comentarios de la DB de la película, y se actualice con los posts
  const [movieComments, setMovieComments] = useState([]);

  const { auth, postComment } = useContext(UserContext);

  const handleClick = () => {
    setShowMovie(false);
    const modal = document.getElementById('modal-id');
    modal.classList.remove('modal_show');
    document.body.classList.remove('modal_overflow');
    setMovieComments([]);
    setMovieSelected(null);
  }

  const handleKeyUp = (e) => {
    setComment({
      message: e.target.value,
      characters: 200-e.target.value.length
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if(!auth){
      errors.log = 'Debe logearse para Comentar'
      setErrors(errors)
      return
    }else{
      if(comment.message.length < 2 || comment.message.length > 200){
        errors.length = 'La cantidad de caracteres no puede ser menor a 2 ni mayor a 200';
        setErrors(errors);
        return;
      }
      const response = await postComment(movieSelected.show.id, comment.message); //[errors, CommentDB]
      if(Object.keys(response[0]).length !== 0){
        setErrors(response[0])
      }else{
        setCheck(true)
        e.target.reset();
        setComment({
          ...comment,
          characters: 200
        })
        const newMovieCommentsArray = movieComments.concat([response[1]]);
        setMovieComments(newMovieCommentsArray);
      }
    }
  }

  const bringMovieComments = async () => {
    try {
      const response = await axiosBackendClient.get(`/comments/${movieSelected.show.id}`);
      if(response.status === 200){
        setMovieComments(response.data);
      }
    } catch (error) {
      setErrors({servidor: 'Error al cargar los comentarios'})
    }
  }

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      console.log(errors);
    }
  }, [errors])

  useEffect(() => {
    if(check){
      console.log('Comentario posteado');
      setCheck(false)
    }
  }, [check])

  useEffect(() => {
    if(movieSelected !== null){
      bringMovieComments();
    }
  }, [movieSelected])

  const prueba = () => {
    console.log(movieSelected)
  }

  return (
    movieSelected === null ? null : (
      <div className='movie-style d-flex flex-column align-items-center text-light pb-5'>
      {/* <button onClick={prueba}>prueba</button> */}
      <div onClick={handleClick} className="align-self-start px-4 py-2 pointer">
        <FontAwesomeIcon icon={faArrowLeft} className="arrowSize" />
      </div>
      <div className='p-3'>
        <div className='movie-box-details d-flex flex-column justify-content-end text-center px-3 pb-3' style={{backgroundImage: `url(${movieSelected.show.image?.medium})`}}>
          <div>
            <div>{movieSelected.show?.image === null ? 'IMAGEN NO DISPONIBLE' : null}</div>
            <div className='rating-style rounded-pill'>{movieSelected.show?.weight/10}/10</div>
          </div>
        </div>
      </div>
      <ButtonFav data={movieSelected} />
      <span className='fs-5 text-decoration-underline'>{movieSelected.show.name}</span>
      <span className='p-3 text-center'>{movieSelected.show.summary}</span>
      <div className='px-2 py-5 border border-light'>
        <form onSubmit={handleSubmit}>
          <input type="text" onKeyUp={handleKeyUp} />
          <button type='submit'>Comentar</button>
          <br />
          <span>{comment.characters} carateres restantes</span>
        </form>
      </div>
      <Comments movieComments={movieComments} setMovieComments={setMovieComments} />
    </div>
    )
  );
};

export default Movie;