import React from 'react';
import styled from 'styled-components';
import { IoCheckmarkOutline } from "react-icons/io5";

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const InputBlock = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  gap: 1rem;
`;

const Label = styled.div`
  font-size: clamp(1.5rem, 1vw, 1.8rem);
  color: #FFFFFF;
`;

const Description = styled.div`
  font-size: clamp(1.2rem, 1vw, 1.5rem);
  color: #8f8f8f;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vw, 0.8rem);
`;

const DuplicateButton = styled.button<{ isActive: boolean; isChecked: boolean }>`
  padding: 0.5rem 1rem;
  background: ${props => {
    if (props.isChecked) return 'transparent';
    if (props.isActive) return '#E51D1D';
    return '#424242';
  }};
  color: ${props => {
    if (props.isChecked) return '#E51D1D';
    if (props.isActive) return '#000000';
    return '#212121';
  }};
  border: none;
  border-radius: 4px;
  cursor: ${props => props.isActive ? 'pointer' : 'default'};
  font-size: ${props => props.isChecked ? '1rem' : "0.9rem"};
  height: 40px;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
`;

interface SignUpInputProps {
    label: string;
    description?: string;
    type: string;
  name: string;
  value: string;
  placeholder?: string;
  hasError?: boolean;
  showDuplicateCheck?: boolean;
  isDuplicateCheckActive?: boolean; // optional로 변경
  isDuplicateChecked?: boolean; // optional로 변경
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDuplicateCheck?: () => void;
}

export const SignUpInput: React.FC<SignUpInputProps> = ({
  label,
  description,
  type,
  name,
  value,
  placeholder,
  hasError,
  showDuplicateCheck = false,
  isDuplicateCheckActive = false,
  isDuplicateChecked = false,
  onChange,
  onDuplicateCheck
}) => {
  return (
    <InputContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Label>{label}</Label>
        {description && <Description>{description}</Description>}
      </div>
      <InputWrapper>
        <InputBlock>
          <StyledInput
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            hasError={hasError}
          />
          {showDuplicateCheck && (
            <DuplicateButton 
              type="button"
              isActive={isDuplicateCheckActive}
              isChecked={isDuplicateChecked}
              onClick={onDuplicateCheck}
              disabled={!isDuplicateCheckActive}
            >
              {isDuplicateChecked ? (
                <IoCheckmarkOutline size={40} />
              ) : (
                '중복확인'
              )}
            </DuplicateButton>
          )}
        </InputBlock>
      </InputWrapper>
    </InputContainer>
  );
};