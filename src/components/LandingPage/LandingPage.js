import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/Users/UserContext";
import { validationLogin } from "../../helpers/Validations";
import "./LandingPage.css";

const LandingPage = () => {
  const [userLog, setUserLog] = useState({
    user: '',
    password: ''
  })
  const [errors, setErrors] = useState({});
  const [check, setCheck] = useState(false); //AL MOMENTO NO LO ESTARÍA USANDO

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
          console.log('Usuario Logeado');
          e.target.reset();
          setUserLog({
            user: '',
            password: ''
          })
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
    // if(!auth){
    //   getAuth();  COMO ESTA PÁGINA TIENE HEADER, NO TIENE SENTIDO QUE LO PONGA ACÁ. SI ESTA PÁGINA NO TUVIESE, LE TENGO QUE AGREGAR, Y ES LO QUE VA A PASAR MÁS ADELANTE
    // }
  }, [])

  return (
    <div className="landingPage-style d-flex flex-column align-items-center justify-content-center">
      <span className="mb-5 border border-dark p-5">IMAGEN POCHOCLOS</span>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Usuario" onKeyUp={handleKeyUp} name="user" maxLength={50} />
        <br />
        <input type="password" placeholder="Contraseña" onKeyUp={handleKeyUp} name="password" maxLength={50} />
        <br />
        <button type="submit">Iniciar Sesión</button>
        <br />
        {
          Object.keys(errors).length !== 0 ? (
            Object.values(errors).map((error, index) => (
              <div key={index} className='mt-2 border border-dark text-center px-3'>{error}</div>
            ))
          ) : null
        }
      </form>
      <Link to="/register">Create un Usuario</Link>
      <br />
      <button onClick={prueba}>PRUEBA</button>
    </div>
  );
};

export default LandingPage;
