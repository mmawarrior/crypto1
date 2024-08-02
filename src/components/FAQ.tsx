// src/components/FAQ.js
import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import FAQItem from './Question';

const FAQSection = styled.section`
  padding: 40px 20px;
  background-color: #f8f9fa;
  color: black;
`;

const FAQTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;

const FAQContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How Do I Benefit From The ICO Token?",
      answer: "Detailed explanation of benefits from ICO token..."
    },
    {
      question: "How To Buy Cryptocurrency?",
      answer: "Step-by-step guide to buying cryptocurrency..."
    },
    {
      question: "What Is Cryptocurrency?",
      answer: "Definition and overview of cryptocurrency..."
    },
    {
      question: "What Are The Objectives Of This Token?",
      answer: "Objectives and goals of the token..."
    },
    {
      question: "What Cryptoz Smart Contract?",
      answer: "Explanation of Cryptoz Smart Contract..."
    },
    {
      question: "What Is The Refund Policy?",
      answer: "Details on refund policy..."
    },
    {
      question: "What Is 3D Design And How It Work?",
      answer: "Explanation of 3D design process..."
    },
    {
      question: "Bitcoin Payment System?",
      answer: "Details on how Bitcoin payment system works..."
    },
  ];

  const half = Math.ceil(faqs.length / 2);
  const firstHalf = faqs.slice(0, half);
  const secondHalf = faqs.slice(half);

  return (
    <FAQSection>
      <FAQTitle>Frequently Asked Questions</FAQTitle>
         <FAQContainer>
          <div>
            {firstHalf.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <div>
            {secondHalf.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </FAQContainer>
     </FAQSection>
  );
};

export default FAQ;
