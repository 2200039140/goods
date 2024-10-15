// src/auth/ProtectedRoute.js
import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ roleRequired, children }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated || role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
