// AuthContext.tsx

import React, { createContext, useContext, useState } from 'react';

// Define the shape of authentication context
interface AuthContextType {
  isAuthenticated: boolean; // Indicates if the user is authenticated
  login: () => void; // Function to log the user in
  logout: () => void; // Function to log the user out
}

// Create the context with initial value undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that manages authentication state
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to track authentication status, initialized from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Your authentication logic to determine initial isAuthenticated state
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Function to set isAuthenticated to true and store in localStorage
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  // Function to set isAuthenticated to false and remove from localStorage
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  // Provide the authentication context value to children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to conveniently access authentication context within components
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export AuthProvider and useAuth hook for use in other components
export { AuthProvider, useAuth };
