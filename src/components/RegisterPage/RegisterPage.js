import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosBackendClient } from '../../config/axiosConfig';
import UserContext from '../../context/Users/UserContext';
import { validationRegister } from '../../helpers/Validations';
import './RegisterPage.css';

const RegisterPage = () => {
  const [newUser, setNewUser] = useState({
    naim: '',
    user: '',
    pass1: '',
    pass2: ''
  })
  const [errors, setErrors] = useState({});
  const [check, setCheck] = useState(false);

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
      setTimeout(() => {
        const log = window.confirm('Usuario generado exitosamente, desea iniciar sesión?')
        if(log){
          const loginErrors = login({
            user: newUser.user,
            password: newUser.pass1
          });
          if(Object.keys(loginErrors).length !== 0){
            console.log('Error al iniciar sesión automaticamente');
            setErrors(loginErrors)
          }else{
            console.log('Usuario logeado');
          }
        }
        setCheck(false)
      }, 1000)
    }
  }, [check]);

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      console.log(errors);
    }
  }, [errors])

  return (
    <div className="register-style d-flex flex-column align-items-center justify-content-center">
      <h4>Formulario de Registro</h4>
      <form onSubmit={handleSubmit} className="border border-dark p-5">
        <input type="text" placeholder="Nombre" name='naim' onKeyUp={handleKeyUp} maxLength={50} className="is-valid" />
        <br />
        <input type="text" placeholder="Usuario" name='user' onKeyUp={handleKeyUp} maxLength={50} className="is-valid" />
        <br />
        <input type="password" placeholder="Contraseña" name='pass1' onKeyUp={handleKeyUp} maxLength={50} className="is-valid" />
        <br />
        <input type="password" placeholder="Repetir contraseña" name='pass2' onKeyUp={handleKeyUp} maxLength={50} className="is-valid" />
        <br />
        <button type="submit">Registrarme</button>
        <br />
        {
          Object.keys(errors).length !== 0 ? (
            Object.values(errors).map((error, index) => (
              <div key={index} className='mt-2 border border-dark text-center px-3'>{error}</div>
            ))
          ) : null
        }
      </form>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default RegisterPage;