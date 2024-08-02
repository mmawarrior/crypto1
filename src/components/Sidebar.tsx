// Sidebar.tsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaTachometerAlt, FaWallet, FaNewspaper, FaCog } from 'react-icons/fa';

interface SidebarProps {
  open: boolean;
}

export const SidebarContainer = styled.div<SidebarProps>`
 width: 250px;
  background-color: #152860;
  height: 100vh;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  transition: left 0.3s;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (max-width: 1200px) {
    position: relative;
    width: 100%;
    height: auto;
    top: 75px;
    left: 0;
    display: ${({ open }) => (open ? 'flex' : 'none')};
    padding: 20px 0;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 700px) {
    align-items: center;
  }
`;

export const SidebarHeader = styled.h2`
  margin-bottom: 40px;
  font-size: 24px;
  font-family: 'Arial', sans-serif;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    text-align: center;
    width: 100%;
  }
`;

export const SidebarItem = styled(Link)<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  width: 100%;
  text-align: left; /* Zorgt ervoor dat de tekst links wordt uitgelijnd */

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: #4d96ff;
  }

  @media (max-width: 768px) {
    justify-content: flex-start; /* Zorgt ervoor dat de items links worden uitgelijnd */
  }
`;

export const IconWrapper = styled.div`
  min-width: 30px;
  display: flex;
  justify-content: center;
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

export const TextWrapper = styled.span`
  text-align: left;
  flex-grow: 1;

  @media (max-width: 768px) {
    text-align: none;
    margin-left: 10px;
  }
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 768px) {
    padding-top: 15px;
  }
`;

 
const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  return (
    <SidebarContainer open={open}>
      <SidebarHeader>Zenix</SidebarHeader>
      <SidebarMenu>
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
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
