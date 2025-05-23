import type React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = getStoredToken();

  const isTokenValid = token && verifyToken(token);

  return isTokenValid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
