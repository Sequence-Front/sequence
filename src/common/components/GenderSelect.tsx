import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vw, 0.8rem);
`;

const Label = styled.div`
  font-size: clamp(1.5rem, 1.5vw, 2rem);
  color: #FFFFFF;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: clamp(1rem, 2vw, 1.5rem);
  height: 100%;
`;

const GenderButton = styled.button<{ isSelected: boolean }>`
  padding: clamp(0.1rem, 0.5vw, 0.2rem) clamp(0.2rem, 2vw, 1rem);
  border-radius: 20px;
  border: 1px solid #616161;
  background: ${props => props.isSelected ? '#212121' : 'transparent'};
  color: ${props => props.isSelected ? '#FFFFFF' : '#616161'};
  cursor: pointer;
  font-size: clamp(0.9rem, 1.5vw, 1.2rem);
`;

interface GenderSelectProps {
  selectedGender: string;
  onSelect: (gender: string) => void;
}

export const GenderSelect: React.FC<GenderSelectProps> = ({
  selectedGender,
  onSelect
}) => {
  return (
    <Container>
      <Label>성별</Label>
      <ButtonContainer>
        <GenderButton
          type="button"
          isSelected={selectedGender === '남성'}
          onClick={() => onSelect('남성')}
        >
          남성
        </GenderButton>
        <GenderButton
          type="button"
          isSelected={selectedGender === '여성'}
          onClick={() => onSelect('여성')}
        >
          여성
        </GenderButton>
      </ButtonContainer>
    </Container>
  );
};
