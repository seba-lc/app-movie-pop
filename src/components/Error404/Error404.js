import './Error404.css';
import img404 from './../../assets/img/404-image.webp';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className='error-page text-light'>
      <div className='error-style p-3'>
        <img src={img404} alt="404-img" width={300} />
        <h1 className='fw-bold mt-1 display-1'>404</h1>
        <h4 className='fw-bold border-bottom border-danger py-3'>Error - Page Not Found</h4>
        <p className='fw-bold'>Please check the URL.</p>
        <p className='text-center'>Otherwise, press the link below to be redirected to the homepage.</p>
        <Link to='/' className='fs-4 fw-bold text-info'>Redirect-me</Link>
      </div>
    </div>
  );
};

export default Error404;