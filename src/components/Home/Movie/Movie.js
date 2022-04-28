import { useContext, useEffect, useState } from 'react';
import { axiosBackendClient } from '../../../config/axiosConfig';
import UserContext from '../../../context/Users/UserContext';
import Comments from '../Comments/Comments';
import './Movie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUpload } from '@fortawesome/free-solid-svg-icons';
import ButtonFav from '../ButtonFav';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Movie = ({showMovie, setShowMovie, movieSelected, setMovieSelected}) => {
  const [comment, setComment] = useState({
    message: '',
    characters: 200
  });
  const [errors, setErrors] = useState({});
  const [check, setCheck] = useState(false);
  const [movieComments, setMovieComments] = useState([]);
  const [sum, setSum] = useState('');

  const { auth, postComment } = useContext(UserContext);

  const handleClick = () => {
    setShowMovie(false);
    const modal = document.getElementById('modal-id');
    modal.classList.remove('modal_show');
    document.body.classList.remove('modal_overflow');
    setMovieComments([]);
    // setMovieSelected(null);
  }

  const handleChange = (e) => {
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

  const closeModal = (e) => {
    if(showMovie){
      if(e.keyCode === 27){
        setShowMovie(false);
        const modal = document.getElementById('modal-id');
        modal.classList.remove('modal_show');
        document.body.classList.remove('modal_overflow');
        setMovieComments([]);
      }
    }
  }

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      let errorArr = [];
      Object.values(errors).forEach(item => errorArr.push(item));
      const showError = errorArr.join('\n');
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: showError,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }, [errors])

  useEffect(() => {
    if(showMovie){
      window.addEventListener('keydown', closeModal);
    }else{
      window.removeEventListener('keydown', closeModal);
    }

    return () => {
      window.removeEventListener('keydown', closeModal);
    }
  }, [showMovie])

  useEffect(() => {
    if(check){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Comentario posteado',
        showConfirmButton: false,
        timer: 1500
      })
      setCheck(false)
    }
  }, [check])

  useEffect(() => {
    if(movieSelected !== null && showMovie){
      bringMovieComments();
    }
  }, [showMovie])

  const prueba = () => {
    console.log(movieSelected)
  }

  useEffect(() => {
    if(movieSelected !== null && movieSelected.show.summary !== null){
      //funcion para sacar las etiquetas de html del resumen
      const sumSplited = movieSelected.show.summary.split("");
      let sumCorrected = [];
      let remove = false;
      for(let i = 0; i < sumSplited.length; i++){
        if(sumSplited[i] === '<'){
          remove = true;
        }else if(sumSplited[i] === '>'){
          remove = false;
        }else{
          if(!remove){
            sumCorrected.push(sumSplited[i])
          }
        }
      }
      setSum(sumCorrected.join(""));
    }
    if(movieSelected?.show.summary === null){
      setSum('Descripción no disponible')
    }
  }, [movieSelected])

  useEffect(() => {
    if(!showMovie){
      setComment({
        message: '',
        characters: 200
      })
    }
  }, [showMovie])

  return (
    movieSelected === null ? null : (
      <div className='movie-style d-flex flex-column align-items-center text-light pb-5'>
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
      <span className='p-3 text-center'>{sum}</span>
      <div className=' w-100 px-3'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="w-90">
            <Form.Control as="textarea" placeholder='Dejá tu comentario' rows={2} onChange={handleChange} value={comment.message} />
          </Form.Group>
          <span>{comment.characters}/200</span>
          <Button variant='outline-warning' type='submit' className='w-100 mt-1 py-0'><FontAwesomeIcon icon={faUpload} /></Button>
        </Form>
      </div>
      <Comments movieComments={movieComments} setMovieComments={setMovieComments} />
    </div>
    )
  );
};

export default Movie;