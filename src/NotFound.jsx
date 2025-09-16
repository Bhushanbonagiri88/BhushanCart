import React from 'react';

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-3">404 Page Not Found!</h1>
      <p className="lead">This page does not exist.</p>
      <img 
        src="/images/404.jpg" 
        alt="404 Not Found" 
        className="img-fluid" 
        style={{ maxWidth: '70%' }}
      />
    </div>
  );
}

export default NotFound;
