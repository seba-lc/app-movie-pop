import { useContext, useEffect, useState } from 'react';
import { axiosBackendClient } from '../../../config/axiosConfig';
import UserContext from '../../../context/Users/UserContext';
import './Comments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

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
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Comentario Eliminado',
        showConfirmButton: false,
        timer: 1500
      })
      setCheckDelete(false);
    }
  }, [checkDelete])

  return (
    <div className='mt-3 px-3 w-100'>
        {
          movieComments?.map((item, index) => (
            <div key={index} className='border-bottom'>
              <span className='border-bottom'>{item.user}:</span>
              <div className='d-flex align-items-center justify-content-between'>
                <div className='text-break my-1 me-2'> {item.message}</div>
                <div className='ps-2'>
                  {
                    userLogged.user !== item.user ? <div></div> : (
                      <div className='border border-danger text-danger px-1 pointer rounded' onClick={() => handleClick(item._id)}><FontAwesomeIcon icon={faTrash} /></div>
                    )
                  }
                </div>
              </div>
            </div>
            // <li key={index} className='d-flex justify-content-between border-bottom px-3'>
            //   <div className='text-break'>{item.user}: {item.message}</div>
            //   {
            //     userLogged.user !== item.user ? <div></div> : (
            //       <button onClick={() => handleClick(item._id)}>X</button>
            //     )
            //   }
            // </li>
          ))
        }
    </div>
  );
};

export default Comments;