import { Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registrado');
  }

  return (
    <div className="register-style d-flex flex-column align-items-center justify-content-center">
      <h4>Formulario de Registro</h4>
      <form onSubmit={handleSubmit} className="border border-dark p-5">
        <input type="text" placeholder="Nombre" />
        <br />
        <input type="email" placeholder="Email" />
        <br />
        <input type="password" placeholder="Contraseña" />
        <br />
        <input type="password" placeholder="Repetir contraseña" />
        <br />
        <button type="submit">Registrarme</button>
      </form>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default RegisterPage;