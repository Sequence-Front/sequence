import React from 'react';
import styled from 'styled-components';

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vw, 0.8rem);
`;

const Label = styled.div`
  font-size: clamp(1.5rem, 1.5vw, 2rem);
  color: #FFFFFF;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.hasError ? '#E51D1D' : '#616161'};
  padding: clamp(0.5rem, 1vw, 0.8rem) 0;
  color: #FAFAFA;
  font-size: clamp(0.9rem, 1.5vw, 1.2rem);

  &:focus {
    outline: none;
    border-bottom: 1px solid ${props => props.hasError ? '#E51D1D' : '#E0E0E0'};
  }
`;

interface CommonInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hasError?: boolean;
}

export const CommonInput: React.FC<CommonInputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  hasError
}) => (
  <InputBlock>
    <Label>{label}</Label>
    <Input 
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      hasError={hasError}
    />
  </InputBlock>
); 