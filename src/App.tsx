import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Header from './components/Header';
import MainSection from './components/MainSection';
import SideSection from './components/SideSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import WalletOverview from './components/WalletOverview';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Modal from './components/Modal';
import Dashboard from './components/Dashboard'; // Voeg deze import toe
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #1e3a8a, #2563eb);
    color: white;
  }
`;

const AppContainer = styled.div`
  text-align: center;
`;

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <AuthProvider>
      <Router>
        <AppContainer>
          <GlobalStyle />
          <Header
            onAboutClick={() => {}}
            onServicesClick={() => {}}
            onOverviewClick={() => {}}
            toggleMenu={toggleMenu}
            menuOpen={menuOpen}
          />
          <Content menuOpen={menuOpen} />
        </AppContainer>
      </Router>
    </AuthProvider>
  );
};

const Content: React.FC<{ menuOpen: boolean }> = ({ menuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && (location.pathname === '/about' || location.pathname === '/services' || location.pathname === '/dashboard/OverviewBalance')) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [isAuthenticated, location.pathname]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginRedirect = () => {
    setIsModalOpen(false);
    navigate('/login');
  };

  const handleAboutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      navigate('/about');
    }
  };

  const handleServicesClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      navigate('/services');
    }
  };

  const handleOverviewClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      navigate('/dashboard/OverviewBalance');
    }
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return (
    <>
      {isDashboardPage && <Sidebar open={menuOpen} />}
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAuthPage && !isDashboardPage && <SideSection />}
      {!isAuthPage && !isDashboardPage && <FAQ />}
      {!isAuthPage && !isDashboardPage && <Footer />}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Go to Login</h2>
        <p>You must be logged in to view this page.</p>
        <StyledButton onClick={handleLoginRedirect}>Go to Login</StyledButton>
      </Modal>
    </>
  );
};

const StyledButton = styled.button`
  background-color: #1e3a8a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #2563eb;
  }
`;

const DashboardRoutes: React.FC = () => {
  return (
    <DashboardWrapper>
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="OverviewBalance" element={<PrivateRoute element={<WalletOverview />} path="/dashboard/OverviewBalance" />} />
        </Routes>
      </ContentWrapper>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  display: flex;
  margin-left: 250px;

  @media (max-width: 1200px) {
    display: flow;
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
`;

export default App;
