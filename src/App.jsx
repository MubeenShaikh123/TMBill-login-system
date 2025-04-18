import './App.css'
import Forgot_Password from './components/Forgot_password';
import Home from './components/Home'
import Layout from './components/Layout';
import Login from './components/Login'
import Register from './components/Register'
import { Routes, Route } from 'react-router-dom';
import TODO from './components/TODO';

function App() {

  return (
    <Routes>
      {/* Protected routes inside layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TODO />} />
      </Route>
      {/* <Route path="/" element={<Layout><Home /></Layout>} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<Forgot_Password />} />
    </Routes>
  )
}

export default App
