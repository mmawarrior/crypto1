import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
  background: url('/img/bg.jpg') no-repeat center center/cover;
  text-align: center;
  padding: 0 20px;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 4em;
  margin: 0;
  z-index: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add shadow effect */
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  margin: 20px 0 0;
  z-index: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add shadow effect */
`;

const MainSection: React.FC = () => {
  return (
    <MainContainer>
      <Title>Welcome to the Crypto</Title>
      <Subtitle>Start your crypto adventure</Subtitle>
    </MainContainer>
  );
}

export default MainSection;
