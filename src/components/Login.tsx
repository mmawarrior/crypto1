// Import React, state hook en extra dependencies
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Importeer je eigen Firebase config
import { useAuth } from '../components/AuthContext'; // Auth context voor globale login status

// Styled Components voor de UI
const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1f2235;
  background: url('/img/bg1.PNG') no-repeat center center/cover;
  align-items: center;
  justify-content: center;
`;

// Formulier styling
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

// Input styling voor email & wachtwoord
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

// Standaard Button
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

// Google login button met aparte kleur
const GoogleButton = styled(Button)`
  background-color: #db4437;
  &:hover {
    background-color: #e57368;
  }
`;

// Link naar registratiepagina
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

// Container voor buttons (sign in + register)
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Hoofdcomponent
const Login: React.FC = () => {
  // States voor formulierdata
  const [email, setEmail] = useState('user@user.nl'); // Default voor test gemak
  const [password, setPassword] = useState('user@user.nl'); // Zelfde default
  const [error, setError] = useState(''); // Error boodschap
  const navigate = useNavigate(); // Router navigatie
  const { login } = useAuth(); // Auth context voor login status

  // Placeholder functie voor Google login
  const handleGoogleLogin = () => {
    // Hier kan je later Google auth logica toevoegen
  };

  // Handler voor gewone email login
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    // Simpele email validatie
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      // Firebase login
      await auth.signInWithEmailAndPassword(email, password);

      // Zet de globale login status via context
      login();

      // Redirect naar dashboard of overview na succesvolle login
      navigate('/dashboard/OverviewBalance');
    } catch (error) {
      // Error logging (voor debugging)
      console.error('Error logging in: ', error);

      // Error afhandeling op basis van Firebase foutcode
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

  // Render de login pagina
  return (
    <LoginContainer>
      <LoginForm>
        <Title>Welcome Back</Title>
        <Description>Login to your crypto account</Description>
        {/* Google login knop */}
        <GoogleButton onClick={handleGoogleLogin}>Sign in with Google</GoogleButton>
        <p>OR</p>
        {/* Login formulier */}
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            defaultValue="user@user.nl"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            defaultValue="user@user.nl"
          />
          {/* Error boodschap */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* Optie voor onthouden + wachtwoord vergeten */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe" style={{ marginLeft: '5px' }}>Remember Me</label>
            </div>
            <span style={{ fontSize: '14px', color: '#b0b3b8' }}>Forgot Password?</span>
          </div>

          {/* Inloggen en registreren */}
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
