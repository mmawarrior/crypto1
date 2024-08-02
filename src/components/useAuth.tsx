// src/components/useAuth.ts

import { useState, useEffect } from 'react';
import { auth } from './firebase'; // Zorg ervoor dat dit pad correct is naar je firebase import

// Custom hook useAuth to manage authentication state
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status

  useEffect(() => {
    // Effect to subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user); // Update isAuthenticated based on user authentication state
    });

    // Cleanup function to unsubscribe from auth state changes when component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this effect runs only once

  // Return isAuthenticated state to be used by consuming components
  return { isAuthenticated };
};