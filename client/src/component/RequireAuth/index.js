import React, { useContext } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { Spin } from 'antd';

function RequireAuth({ children }) {
  //context
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  //location current
  const location = useLocation();
  if (authLoading) {
    return (
      <div className="flex justify-center w-full h-[100vh]">
        <Spin className="flex items-center" size="large" />
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <h1>narbar</h1>
          {children}
        </>
      ) : (
        <Navigate to={`/auth/login`} state={{ from: location }} replace />
      )}
    </>
  );
}

export default RequireAuth;
