import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('inicio sesion');
  }

  return (
    <div className="landingPage-style d-flex flex-column align-items-center justify-content-center">
      <span className="mb-5 border border-dark p-5">IMAGEN POCHOCLOS</span>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Usuario" />
        <br />
        <input type="password" placeholder="Contraseña" />
        <br />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <Link to="/register">Create un Usuario</Link>
    </div>
  );
};

export default LandingPage;
