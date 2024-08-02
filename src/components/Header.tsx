import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { FaUserCircle, FaTachometerAlt, FaWallet, FaNewspaper, FaCog } from 'react-icons/fa';
import { SidebarItem, IconWrapper, TextWrapper } from './Sidebar';

interface NavProps {
  open?: boolean;
  animate?: boolean;
}

interface HeaderProps {
  onAboutClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onServicesClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onOverviewClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  toggleMenu: () => void;
  menuOpen: boolean;
}

const HeaderContainer = styled.div`
  background: #1e3a8a;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

const Nav = styled.nav<NavProps>`
  display: flex;
  align-items: center;

  a {
    color: white;
    text-decoration: none;
    margin: 0 10px;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 1200px) {
    display: ${props => (props.open ? 'block' : 'none')};
    position: absolute;
    top: 49px;
    left: 0; /* Veranderd van right: 0 naar left: 0 */
    background: #1e3a8a;
    width: 100%;
    text-align: left; /* Veranderd van center naar left */
    padding: 10px 0;
    z-index: 1000;

    a {
      display: block;
      margin: 10px 20px; /* Veranderd van 10px 0 naar 10px 20px */
    }
  }
`;

const LogoutButton = styled.button`
  color: white;
  font-size: 16px;
  background-color: #1e3a8a;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
 @media (max-width: 1200px) {
    display: block;
    margin: 10px 15px; /* Zorgt ervoor dat de margin consistent is */
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedNav = styled(Nav)`
  ${({ animate }) =>
    animate &&
    css`
      animation: ${fadeIn} 0.0s ease-in-out;
    `}
`;

const BurgerIcon = styled.div<{ open: boolean }>`
  display: none;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 1200px) {
    display: block;
  }

  div {
    width: 25px;
    height: 3px;
    background: white;
    margin: 5px 0;
    transition: 0.3s;
    transform: ${props => (props.open ? 'rotate(45deg)' : 'none')};

    &:nth-child(2) {
      opacity: ${props => (props.open ? '0' : '1')};
    }

    &:nth-child(3) {
      transform: ${props => (props.open ? 'rotate(-45deg)' : 'none')};
    }
  }
`;

const SidebarItemsContainer = styled.div`
  display: none;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const Header: React.FC<HeaderProps> = ({ onAboutClick, onServicesClick, onOverviewClick, toggleMenu, menuOpen }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Use location to get the current path

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate to home or login page after logout
  };

  const handleLinkClick = (onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick(event);
    toggleMenu();
  };

  // Determine if the current path is the dashboard path
  const isDashboardPath = location.pathname.startsWith('/dashboard');

  return (
    <HeaderContainer>
      <Logo as={Link} to="/">Kripto</Logo>
      <BurgerIcon open={menuOpen} onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </BurgerIcon>
      <AnimatedNav animate={true} open={menuOpen}>
        <Link to="/" onClick={handleLinkClick(onOverviewClick)}>Home</Link>
        <Link to="/dashboard/OverviewBalance" onClick={handleLinkClick(onOverviewClick)}>Overview</Link>
        <Link to="/about" onClick={handleLinkClick(onAboutClick)}>About</Link>
        <Link to="/services" onClick={handleLinkClick(onServicesClick)}>Services</Link>
        {isAuthenticated ? (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        ) : (
          <Link to="/login" onClick={toggleMenu}>Login</Link>
        )}
        {isDashboardPath && ( // Conditionally render the sidebar items
          <SidebarItemsContainer>
            <SidebarItem to="#">
              <IconWrapper><FaUserCircle /></IconWrapper>
              <TextWrapper>Hello, Marquez</TextWrapper>
            </SidebarItem>
            <SidebarItem to="/dashboard">
              <IconWrapper><FaTachometerAlt /></IconWrapper>
              <TextWrapper>Dashboard</TextWrapper>
            </SidebarItem>
            <SidebarItem to="/dashboard/OverviewBalance">
              <IconWrapper><FaWallet /></IconWrapper>
              <TextWrapper>My Wallet</TextWrapper>
            </SidebarItem>
            <SidebarItem to="/dashboard/news">
              <IconWrapper><FaNewspaper /></IconWrapper>
              <TextWrapper>News</TextWrapper>
            </SidebarItem>
            <SidebarItem to="/dashboard/settings">
              <IconWrapper><FaCog /></IconWrapper>
              <TextWrapper>Settings</TextWrapper>
            </SidebarItem>
          </SidebarItemsContainer>
        )}
      </AnimatedNav>
    </HeaderContainer>
  );
};

export default Header;
