import { useContext, useEffect, useState } from 'react';
import { axiosBackendClient } from '../../../config/axiosConfig';
import UserContext from '../../../context/Users/UserContext';
import './Comments.css'

const Comments = ({movieComments, setMovieComments}) => {
  const {userLogged} = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [checkDelete, setCheckDelete] = useState(false);

  const handleClick = async (id) => {
    try {
      const response = await axiosBackendClient.delete(`/comments/${id}`)
      if(response.status === 200){
        setCheckDelete(true);
        const newCommentsArray = movieComments.filter(item => item._id !== id);
        setMovieComments(newCommentsArray);
      }
    } catch (error) {
      setErrors({servidor: 'Error al eliminar el comentario'})
    }
  }

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      console.log(errors);
    }
  }, [errors])

  useEffect(() => {
    if(checkDelete){
      console.log('Comentario eliminado');
      setCheckDelete(false);
    }
  }, [checkDelete])

  return (
    <div className='border border-info comment-box mt-3'>
      <ul>
        {
          movieComments?.map((item, index) => (
            <li key={index} className='d-flex justify-content-between border-bottom px-3'>
              <div>{item.user}: {item.message}</div>
              {
                userLogged.user !== item.user ? <div></div> : (
                  <button onClick={() => handleClick(item._id)}>X</button>
                )
              }
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Comments;