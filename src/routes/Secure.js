import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  // Check if the token exists in local storage
  const isAuthenticated = localStorage.getItem('token') !== null;

  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default PrivateRoute;
