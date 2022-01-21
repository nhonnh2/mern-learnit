import React from 'react';

function Auth({children}) {
  return <>
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="mb-4">LearnIt</h1>
          <h4 className="mb-3">Keep track of what you are learning</h4>
          {children}
        </div>
      </div>
    </div>
  </>;
}

export default Auth;
