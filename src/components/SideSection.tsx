import React from 'react';
import styled from 'styled-components';

const SideSectionContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 1 kolom voor de afbeelding, 2 kolommen voor tekst en iconen */
  grid-gap: 20px; /* Ruimte tussen de kolommen */
  background-color: white;
  color: #333;
  padding: 60px 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Bij klein scherm, 1 kolom */
    padding: 20px 10px;
  }
`;

const ImageColumn = styled.div`
  grid-row: span 2; /* Neem 2 rijen in beslag */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const SideSectionTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SideSectionContent = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const IconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  align-items: start;
  justify-items: start;
  padding-right: 40px; /* Voeg padding aan de rechterkant toe */
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: left;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

const IconText = styled.span`
  margin-top: 10px;
  font-size: 14px; /* Maak de tekst kleiner */
`;

const SideSection: React.FC = () => {
  return (
    <SideSectionContainer>
      <ImageColumn>
        <img
          src="/img/bg2.png"
          alt="Background Image"
          style={{
            maxWidth: '80%', // Max width for centering
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '40px'
          }}
        />
      </ImageColumn>
      <TextColumn>
        <SideSectionTitle>BrandCoin Just Entered The Real World.</SideSectionTitle>
        <SideSectionContent>
          A cryptocurrency is a shape of virtual asset primarily based totally <br /> on a community that is
          disbursed throughout a big range of computers.
        </SideSectionContent>
        <IconContainer>
          <IconWrapper>
            <Icon src="/img/coin1.png" alt="Payment Options" />
            <IconText>Payment Options<br />You can use crypto to buy regular goods and services.</IconText>
          </IconWrapper>
          <IconWrapper>
            <Icon src="/img/coin1.png" alt="24/7 Support" />
            <IconText>24/7 Support<br />You can use crypto to buy regular goods and services.</IconText>
          </IconWrapper>
          <IconWrapper>
            <Icon src="/img/coin1.png" alt="Reliable Platform" />
            <IconText>Reliable Platform<br />You can use crypto to buy regular goods and services.</IconText>
          </IconWrapper>
          <IconWrapper>
            <Icon src="/img/coin1.png" alt="Safe & Secure" />
            <IconText>Safe & Secure<br />You can use crypto to buy regular goods and services.</IconText>
          </IconWrapper>
        </IconContainer>
      </TextColumn>
    </SideSectionContainer>
  );
}

export default SideSection;
