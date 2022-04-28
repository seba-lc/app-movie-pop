import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/Users/UserContext";
import { validationLogin } from "../../helpers/Validations";
import "./LandingPage.css";
import imagen from './../../assets/img/landing-img.webp';
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";

const LandingPage = () => {
  const [userLog, setUserLog] = useState({
    user: '',
    password: ''
  })
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [bgAnim, setBgAnim] = useState(false);
  const [whiteAnim, setWhiteAnim] = useState(false);
  const [spinnerAnim, setSpinnerAnim] = useState(false);
  const [logAnim, setLogAnim] = useState(0); // 0 -> no pregunto; 1-> auth=true; 2-> auth=false
  const [logged, setLogged] = useState(false);

  const { auth, login, userLogged } = useContext(UserContext);

  const handleKeyUp = (e) => {
    setUserLog({
      ...userLog,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!auth){
      const loginErrors = validationLogin(userLog);
      setErrors(loginErrors);
      if(Object.keys(loginErrors).length === 0){
        const backErrors = await login(userLog);
        setErrors(backErrors);
        if(Object.keys(backErrors).length === 0){
          e.target.reset();
          setUserLog({
            user: '',
            password: ''
          })
          setLogged(true)
        }
      }
    }else{
      console.log('Ya estás logeado');
    }
  }

  useEffect(() => {
    //TENGO QUE ARMARME UN CUSTOM HOOK DE TODA ESTA ANIMACIÓN 
    setTimeout(() => {
      setBgAnim(true)
      setTimeout(() => {
        setWhiteAnim(true)
        setTimeout(() => {
          setSpinnerAnim(true)
          setTimeout(() => {
            if(localStorage.getItem('ok')){
              setLogAnim(1)
              setTimeout(() => {
                navigate('/home')
                localStorage.removeItem('ok')
              }, 3000)
            }else{
              setLogAnim(2);
            }
          }, 3000)
        }, 1000)
      }, 1000)
    }, 800)
  }, [])

  useEffect(() => {
    if(logged){
      setTimeout(() => {
        navigate('/home')
      }, 3000)
    }
  }, [logged])

  useEffect(() => {
    if(auth){
      if(!logged){
        localStorage.setItem('ok', JSON.stringify(true))
      }
    }
  }, [auth])

  return (
    <div className="landingPage-style d-flex flex-column align-items-center justify-content-center position-relative">
      <div className={bgAnim ? "bg-black bg-black_active" : "bg-black"}></div>
      <div className={`loginForm-style p-5 ${whiteAnim ? 'form_active' : null}`}>
        <Message variant="success" posit={logAnim !== 1 ? 'd-none' : 'form-position'}>Bienvenido {userLogged.name?.substring(0, 1).toUpperCase() + userLogged.name?.substring(1)} :)</Message>
        <Form onSubmit={handleSubmit} className={`form-position ${logAnim !== 2 ? 'd-none' : null} ${logged ? 'd-none' : null}`}>
          <FloatingLabel className="mb-3" controlId="userEmail" label="Ingresá tu Usuario">
            <Form.Control className="login-input-style" type="text" placeholder="Ingresá tu Usuario" onKeyUp={handleKeyUp} name="user" maxLength={50} />
          </FloatingLabel>
          <FloatingLabel className="mb-3" controlId="userPassword" label="Ingresá contraseña">
            <Form.Control className="login-input-style" type="password" placeholder="Ingresá contraseña" onKeyUp={handleKeyUp} name="password" maxLength={50} />
          </FloatingLabel>
          <Button variant="primary" type="submit" className="mb-3 w-100">
            Iniciar Sesion
          </Button>
          {
            Object.keys(errors).length !== 0 ? (
              Object.values(errors).map((error, index) => (
                <Message key={index} posit="py-1 my-2 border border-danger" variant="danger">{error}</Message>
              ))
            ) : null
          }
          <div className="create-user-btn text-center bg-dark text-light py-2 mt-4" onClick={() => navigate('/register')}>
            Crear Usuario
          </div>
        </Form>
      </div>
      <br />
      <img src={imagen} className="img-position" width={250} alt="popCorn-img" />
      <div className={`spinnerLanding-position ${spinnerAnim ? 'form_active' : null} ${logAnim !== 0 ? 'dont_show' : null} ${logged ? 'show' : null}`}>
        <Spinner />
      </div>
    </div>
  );
};

export default LandingPage;
