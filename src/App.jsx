import './App.css'
import Forgot_Password from './components/Forgot_password';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<Forgot_Password />} />
    </Routes>
  )
}

export default App
