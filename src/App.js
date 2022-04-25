import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import UserState from './context/Users/UserState';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Register from './pages/Register';

function App() {
  return (
    <>
      <UserState>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </UserState>
    </>
  );
}

export default App;
