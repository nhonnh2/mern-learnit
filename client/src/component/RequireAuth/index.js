import React, { useContext } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { Spin } from 'antd';
import NavbarMenu from '../layout/NavbarMenu';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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
          <NavbarMenu />
          <div className="pt-20">{children}</div>
        </>
      ) : (
        <Navigate to={`/auth/login`} state={{ from: location }} replace />
      )}
    </>
  );
}

export default RequireAuth;
