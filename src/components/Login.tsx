import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Zorg ervoor dat je de juiste import hebt
import { useAuth } from '../components/AuthContext'; // Import useAuth

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1f2235;
  background: url('/img/bg1.PNG') no-repeat center center/cover;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.div`
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

const GoogleButton = styled(Button)`
  background-color: #db4437;
  &:hover {
    background-color: #e57368;
  }
`;

const RegisterLink = styled(Link)`
  display: block;
  color: white;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s;
  text-align: center;
  &:hover {
    color: #61647e;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Gebruik de login functie van de context

  const handleGoogleLogin = () => {
    // Logic for Google login
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Handle successful login
      login(); // Update auth context
      navigate('/dashboard/OverviewBalance'); // Redirect to the overview page
    } catch (error) {
      console.error('Error logging in: ', error);
      // Handle error (e.g., show error message to user)
  
      if (error instanceof Error && 'code' in error) {
        const firebaseError = error as { code: string, message: string };
        if (firebaseError.code === 'auth/invalid-credential' || firebaseError.code === 'auth/wrong-password') {
          setError('The email address or password is incorrect.');
        } else if (firebaseError.code === 'auth/user-not-found') {
          setError('No user found with this email.');
        } else {
          setError('An unknown error occurred. Please try again.');
        }
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <LoginContainer>
      <LoginForm>
        <Title>Welcome Back</Title>
        <Description>Login to your crypto account</Description>
        <GoogleButton onClick={handleGoogleLogin}>Sign in with Google</GoogleButton>
        <p>OR</p>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe" style={{ marginLeft: '5px' }}>Remember Me</label>
            </div>
            <span style={{ fontSize: '14px', color: '#b0b3b8' }}>Forgot Password?</span>
          </div>
          <ButtonContainer>
            <Button type="submit">Sign In</Button>
            <RegisterLink to="/register">Register</RegisterLink>
          </ButtonContainer>
        </form>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
