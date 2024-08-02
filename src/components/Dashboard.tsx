import React from 'react';
import styled from 'styled-components';
import WalletOverview from './WalletOverview';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f0f2f5;
  color: #333;
  min-height: 100vh;
  overflow-y: auto;
`;

const Section = styled.div`
  margin: 20px 0;
  width: 80%;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;

  @media (max-width: 1200px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 95%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  gap: 20px;
  margin-top: 40px;
  align-items: center; // Center content horizontally

  @media (max-width: 1200px) {
    padding: 10px;
    margin-left: 0;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;
  font-size: 2.5em;
  color: #152860;
`;

const SubTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
`;

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <Title>Welcome to the Dashboard</Title>
      <Content>
        <Section>
          <SubTitle>Wallet Overview</SubTitle>
          <WalletOverview />
        </Section>
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;
