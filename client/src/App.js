//import library
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import component
import Auth from './views/Auth';
import LoginForm from './component/auth/LoginForm';
import RegisterForm from './component/auth/RegisterForm';
import AuthProvider from './contexts/AuthProvider';
import Dashboard from './views/Dashboard';
import RequireAuth from './component/RequireAuth';
//styles
import './App.css';
import About from './views/About';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth/login/" element={<Auth formAuth={LoginForm} />} />
          <Route
            path="/auth/register"
            element={<Auth formAuth={RegisterForm} />}
          />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/about"
            element={
              <RequireAuth>
                <About />
              </RequireAuth>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
