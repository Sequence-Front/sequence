import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  min-width: 444px;
  width: 444px;
  padding: 20px;
  flex-shrink: 0;
  scroll-snap-align: start;
`;

const Image = styled.div`
  width: 100%;
  height: 615px;
  background-color: #e5e5e5;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-family: 'Noto Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #e5e6e8;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-family: 'Noto Sans', sans-serif;
  font-size: 1rem;
  color: #e5e6e8;
  line-height: 1.5;
  white-space: pre-wrap;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

interface ExperienceItemProps {
  // image: string;
  title: string;
  description: string;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ title, description }) => {
  return (
    <ItemContainer>
      <Image />
      <Title>{title}</Title>
      <Description>{description}</Description>
    </ItemContainer>
  );
};

export default ExperienceItem;