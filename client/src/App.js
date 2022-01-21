//import library
import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
//import component
import Landing from './component/layout/Landing';
import Auth from './component/views/Auth';
import LoginForm from './component/auth/LoginForm';
import RegisterForm from './component/auth/RegisterForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Auth><LoginForm/></Auth>} />
        <Route path="/auth/register" element={<Auth><RegisterForm/></Auth>} />
        <Route path="/" element={<Landing/>} />
      </Routes>
    </Router>
  );
}

export default App;
