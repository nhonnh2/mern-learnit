import { Spin } from 'antd';
import React, { useContext, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

function Auth({ formAuth: FormAuth }) {
  //context
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  //navigate
  const location = useLocation();
  // path redirect
  const from = useMemo(
    () => location.state?.from?.pathname || '/',
    [isAuthenticated]
  );
  console.log('path redirect', from);

  let content = <FormAuth />;

  //
  if (authLoading) content = <Spin size="large" />;
  else if (isAuthenticated) return <Navigate to={from} />;

  return (
    <>
      <div className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="mb-4">LearnIt</h1>
            <h4 className="mb-3">Keep track of what you are learning</h4>
            {content}
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
