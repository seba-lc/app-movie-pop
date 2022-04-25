import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
  return (
    <div className='bg-secondary header-style d-flex'>
      <div className='ms-5'>
        <Link to="/">Landing</Link>
      </div>
      <div className='ms-auto me-5'>
        <Link to="/home" className='m-3'>Casita</Link>
        <Link to="/home" className='m-3'>Lupita</Link>
      </div>
    </div>
  );
};

export default Header;