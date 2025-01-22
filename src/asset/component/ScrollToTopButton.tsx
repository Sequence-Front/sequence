import React from 'react';
import styled from 'styled-components';
import { IoArrowUpOutline } from "react-icons/io5";

const StyledButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: clamp(50px, 10vw, 90px);
  height: clamp(50px, 10vw, 90px);
  border-radius: 50%;
  background: #E32929;
  border: none;
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  
  svg {
    width: 90%;
    height: 90%;
    color: #212121;
  }
`;

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <StyledButton onClick={scrollToTop}>
      <IoArrowUpOutline />
    </StyledButton>
  );
};

export default ScrollToTopButton;