import { useContext, useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { axiosBackendClient } from '../../config/axiosConfig';
import UserContext from '../../context/Users/UserContext';
import { validationRegister } from '../../helpers/Validations';
import Message from '../Message/Message';
import './RegisterPage.css';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [newUser, setNewUser] = useState({
    naim: '',
    user: '',
    pass1: '',
    pass2: ''
  })
  const [errors, setErrors] = useState({});
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const {login} = useContext(UserContext);

  const handleKeyUp = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCheck(false);
    const registerErrors = validationRegister(newUser);
    setErrors(registerErrors);
    if(Object.keys(registerErrors).length === 0){
      const newUserDB = {
        name: newUser.naim.trim(),
        user: newUser.user.trim(),
        password: newUser.pass1
      }
      try {
        const response = await axiosBackendClient.post('/users/register', newUserDB);
        if(response.status === 200){
          setErrors({});
          setCheck(true);
          e.target.reset();
        }else if(response.status === 201){
          setErrors({user: 'El usuario ya existe, intente con otro'})
        }
      } catch (error) {
        console.log(error);
        setErrors({register: 'Error al registrarse, intentelo nuevamente más tarde'});
      }
    }
  }

  useEffect(() => {
    if(check){
      Swal.fire({
        icon: "success",
        title: "Usuario generado Exitosamente",
        html: `<p>• Usuario: ${newUser.user}</p>
        <p>• Contraseña: ${newUser.pass1}<p> 
        <p>No olvide la Contraseña que no hay recuperación</p>
        <p>¿Desea Iniciar Sesión?</p>
        `,
        // text: 'hola',
        showCancelButton: true,
        confirmButtonColor: "#0B5ED7",
        confirmButtonText: "SI",
        cancelButtonText: "NO"
      }).then((result) => {
        if(result.isConfirmed){
          const loginErrors = login({
            user: newUser.user,
            password: newUser.pass1
          });
          if(Object.keys(loginErrors).length !== 0){
            setErrors('Error al iniciar sesión, inténtelo usted')
          }else{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario logeado',
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout(() => {
              navigate('/');
            }, 1500)
          }
        }
        setCheck(false);
      })
    }
  }, [check]);

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      console.log(errors);
    }
  }, [errors])

  return (
    <div className="register-style d-flex flex-column align-items-center justify-content-center">
      <Form onSubmit={handleSubmit} className='p-5'>
        <FloatingLabel className="mb-3" label="Nombre">
          <Form.Control className="register-input-style" type="text" placeholder="Nombre" onKeyUp={handleKeyUp} name="naim" maxLength={50} />
        </FloatingLabel>
        <FloatingLabel className="mb-3" label="Usuario">
          <Form.Control className="register-input-style" type="text" placeholder="Usuario" onKeyUp={handleKeyUp} name="user" maxLength={50} />
        </FloatingLabel>
        <FloatingLabel className="mb-3" label="Contraseña (al menos 8 caracteres)">
          <Form.Control className="register-input-style" type="password" placeholder="Contraseña (al menos 8 caracteres)" onKeyUp={handleKeyUp} name="pass1" maxLength={50} />
        </FloatingLabel>
        <FloatingLabel className="mb-3" label="Repetir Contraseña">
          <Form.Control className="register-input-style" type="password" placeholder="Repetir Contraseña" onKeyUp={handleKeyUp} name="pass2" maxLength={50} />
        </FloatingLabel>
        <Button variant="primary" type="submit" className="mb-3 w-100">
          Registrarme
        </Button>
        {
          Object.keys(errors).length !== 0 ? (
            Object.values(errors).map((error, index) => (
              <Message key={index} posit="py-1 my-2 border border-danger" variant="danger">{error}</Message>
            ))
          ) : null
        }
      </Form>
      <Link to="/" className='text-light'>Volver al inicio</Link>
    </div>
  );
};

export default RegisterPage;