import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [check, setCheck] = useState(false); //AL MOMENTO NO LO ESTARÍA USANDO
  const navigate = useNavigate();
  const [bgAnim, setBgAnim] = useState(false);
  const [whiteAnim, setWhiteAnim] = useState(false);
  const [spinnerAnim, setSpinnerAnim] = useState(false);
  const [logAnim, setLogAnim] = useState(0); // 0 -> no pregunto; 1-> auth=true; 2-> auth=false
  const [logged, setLogged] = useState(false);

  const { auth, login, getAuth, userLogged, favMovies, favObjectMovies } = useContext(UserContext);

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
          setCheck(true);
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

  const prueba = () => {
    console.log(auth);
    console.log(userLogged);
    console.log(favMovies);
    console.log(favObjectMovies);
  }

  useEffect(() => {
    setTimeout(() => {
      setBgAnim(true)
      setTimeout(() => {
        setWhiteAnim(true)
        setTimeout(() => {
          setSpinnerAnim(true)
          setTimeout(() => {
            if(auth){
              setLogAnim(1)
              setTimeout(() => {
                navigate('/home')
              }, 3000)
            }else{
              setLogAnim(2)
            }
          }, 3000)
        }, 1000)
      }, 1000)
    }, 1500)
  }, [])

  useEffect(() => {
    if(logged){
      setTimeout(() => {
        navigate('/home')
      }, 3000)
    }
  }, [logged])

  return (
    <div className="landingPage-style d-flex flex-column align-items-center justify-content-center position-relative">
      <div className={bgAnim ? "bg-black bg-black_active" : "bg-black"}></div>
      <div className={`loginForm-style p-5 ${whiteAnim ? 'form_active' : null}`}>
        <Message variant="success" posit={logAnim !== 1 ? 'd-none' : 'form-position'}>Bienvenido {userLogged.name}</Message>
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
                <div key={index} className='border border-dark text-center my-1'>{error}</div>
              ))
            ) : null
          }
          <div className="create-user-btn text-center bg-dark text-light py-2 mt-4" onClick={() => navigate('/register')}>
            Crear Usuario
          </div>
        </Form>
      </div>
      <br />
      <button onClick={prueba}>PRUEBA</button>
      <img src={imagen} className="img-position" width={250} alt="popCorn-img" />
      <div className={`spinnerLanding-position ${spinnerAnim ? 'form_active' : null} ${logAnim !== 0 ? 'dont_show' : null} ${logged ? 'show' : null}`}>
        <Spinner />
      </div>
    </div>
  );
};

export default LandingPage;
