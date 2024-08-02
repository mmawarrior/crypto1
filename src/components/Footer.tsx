import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #fff;
  padding: 40px 20px;
  text-align: left;
  border-top: 1px solid #ddd;
  color: black;
`;

const FooterTop = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;

  @media(min-width: 768px) {
    text-align: left;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding: 20px 0;
  background-color: #f1f1f1;
  border-top: 1px solid #ddd;
`;

const Logo = styled.img`
  height: 40px;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: #2563eb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ContactInfo = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <FooterSection>
          <Logo src="/img/logo.png" alt="Crypto Logo" />
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </Text>
        </FooterSection>
        <FooterSection>
          <Title>About Us</Title>
          <LinksList>
            <LinkItem><Link href="#">About</Link></LinkItem>
            <LinkItem><Link href="#">Roadmap</Link></LinkItem>
            <LinkItem><Link href="#">Our Team</Link></LinkItem>
            <LinkItem><Link href="#">Pricing</Link></LinkItem>
            <LinkItem><Link href="#">Contact</Link></LinkItem>
          </LinksList>
        </FooterSection>
        <FooterSection>
          <Title>Services</Title>
          <LinksList>
            <LinkItem><Link href="#">Bitcoin Exchange</Link></LinkItem>
            <LinkItem><Link href="#">BitCoin ATM's & Kiosks</Link></LinkItem>
            <LinkItem><Link href="#">Payment Integration</Link></LinkItem>
            <LinkItem><Link href="#">Research & Development</Link></LinkItem>
            <LinkItem><Link href="#">Secure Wallet</Link></LinkItem>
          </LinksList>
        </FooterSection>
        <FooterSection>
          <Title>Contact Us</Title>
          <ContactInfo>66 Guild Street 512B, Great Town.</ContactInfo>
          <ContactInfo>(+44) 123 456 789</ContactInfo>
          <ContactInfo>info@example.com</ContactInfo>
          <ContactInfo>www.example.com</ContactInfo>
          <ContactInfo>Mon - Sat : 10am - 6pm</ContactInfo>
        </FooterSection>
      </FooterTop>
      <FooterBottom>
        <Text>&copy; 2024 Crypto is Powered by Chitrakoot Web</Text>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
