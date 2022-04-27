import { useContext, useEffect, useState } from 'react';
import { axiosBackendClient } from '../../../config/axiosConfig';
import UserContext from '../../../context/Users/UserContext';
import Comments from '../Comments/Comments';
import './Movie.css';

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
      const response = await postComment(movieSelected.id, comment.message); //[errors, CommentDB]
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
      const response = await axiosBackendClient.get(`/comments/${movieSelected.id}`);
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

  return (
    <div className='movie-style d-flex flex-column align-items-center'>
      <button onClick={handleClick}>X</button>
      <span className='border border-info p-4'>pelicula con clasificación de estrellas dentro</span>
      <span>Titulo</span>
      <span>Sinopsis</span>
      <span>Añadir a favoritos</span>
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
  );
};

export default Movie;