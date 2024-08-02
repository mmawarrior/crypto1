// PrivateRoute.tsx

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

// Define props expected by PrivateRoute component
interface PrivateRouteProps {
  element: React.ReactElement; // Element to render if user is authenticated
  path: string; // Path for the route
}

// PrivateRoute component renders the provided element if user is authenticated, otherwise redirects to login
const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  // Access isAuthenticated state and login/logout functions from AuthContext
  const { isAuthenticated } = useAuth();

  // Render the element if user is authenticated, otherwise navigate to login page
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
