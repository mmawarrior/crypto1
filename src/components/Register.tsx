import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from './firebase'; // Import Firebase authentication

// Styled components for Register form and its elements
const RegisterContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1f2235;
  background: url('/img/bg1.PNG') no-repeat center center/cover;
  align-items: center;
  justify-content: center;
`;

const RegisterForm = styled.div`
  padding: 40px;
  background-color: rgba(0, 10, 49, 0.9);
  border-radius: 10px;
  color: white;
  width: 400px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
`;

const Description = styled.p`
  margin-bottom: 30px;
  font-size: 16px;
  color: #b0b3b8;
`;

const Input = styled.input`
  width: 95%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: none;
  background-color: #3b3f4f;
  color: white;
  font-size: 14px;
  &::placeholder {
    color: #b0b3b8;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin: 15px 0;
  border: none;
  border-radius: 8px;
  background-color: #1e3a8a;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #344d95;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const RegisterButton = styled(Button)`
  background-color: #1e3a8a; /* Blue */
  &:hover {
    background-color: #344d95; /* Darker blue for hover state */
  }
`;

const BackToLoginButton = styled(Button)`
  background-color: #d32f2f; /* Red */
  &:hover {
    background-color: #b71c1c; /* Darker red for hover state */
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

// Register component definition
const Register: React.FC = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Create navigate instance from react-router-dom

  // Function to check if the error is of type FirebaseError
  const isFirebaseError = (error: unknown): error is { message: string } => {
    return typeof error === 'object' && error !== null && 'message' in error;
  };

  // Function to handle registration form submission
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear previous errors

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Password validation (optional)
    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    try {
      // Attempt to register user with provided email and password
      await auth.createUserWithEmailAndPassword(email, password);
      alert('Registration successful'); // Notify user of successful registration
      navigate('/dashboard/OverviewBalance'); // Redirect to OverviewBalance after successful registration
    } catch (error) {
      if (isFirebaseError(error)) {
        console.error(error.message); // Log Firebase error message to console
        setError(error.message); // Set Firebase error message to display to user
      } else {
        console.error('An unknown error occurred'); // Log unknown error to console
        setError('An unknown error occurred'); // Set generic error message to display to user
      }
    }
  };

  // JSX to render Register component
  return (
    <RegisterContainer>
      <RegisterForm>
        <Title>Register</Title>
        <Description>Create your crypto account</Description>
        <form onSubmit={handleRegister}>
          {/* Email input field */}
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
          />
          {/* Password input field */}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
          />
          {/* Display error message if there is an error */}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {/* Register button */}
          <RegisterButton type="submit">Register</RegisterButton>
        </form>
        {/* Container for Back to Login button */}
        <ButtonContainer>
          {/* Link to navigate back to Login page */}
          <BackToLoginButton as={Link} to="/login">Back to Login</BackToLoginButton>
        </ButtonContainer>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register; // Export Register component
