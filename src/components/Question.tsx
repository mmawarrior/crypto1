import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for Question and Answer containers
const QuestionContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  cursor: pointer;
  color: black;
`;

const AnswerContainer = styled.div`
  padding: 20px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-top: none;
  color: black;
`;

// Define props expected by FAQItem component
interface FAQItemProps {
  question: string; // Question text
  answer: string; // Answer text
}

// FAQItem component renders a question and answer with toggle functionality
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage open/close state of answer

  // Function to toggle isOpen state
  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Clickable question container */}
      <QuestionContainer onClick={toggleAnswer}>
        {question}
        {/* Arrow icon indicating open or closed state */}
        <span style={{ float: 'right' }}>{isOpen ? '▲' : '▼'}</span>
      </QuestionContainer>
      {/* Render answer container if isOpen is true */}
      {isOpen && <AnswerContainer>{answer}</AnswerContainer>}
    </>
  );
};

export default FAQItem;
