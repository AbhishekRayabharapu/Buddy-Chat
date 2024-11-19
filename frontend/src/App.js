import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {

  const {authUser} = useAuthContext();
  return (
    <>
    
    <div className='p-4 h-screen flex items-center justify-center' style={{
    background: `url('/images/background.jpg') no-repeat center center fixed`,
    backgroundSize: 'cover',
  }}>
  
   <Routes>
    <Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"} />} />
    <Route path='/login' element={authUser ? <Navigate to="/"/> : <Login />} />
    <Route path='/signup' element={ authUser ? <Navigate to ="/"/> : <Signup/> } />

   </Routes>
   <Toaster/>
    </div>
    
    </>
  );
}

export default App;
