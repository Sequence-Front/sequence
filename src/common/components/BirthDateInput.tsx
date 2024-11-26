import React from 'react';
import { SignUpInput } from '../../signup/component/SignUpInput';

interface BirthDateInputProps {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export const BirthDateInput: React.FC<BirthDateInputProps> = ({
  value,
  onChange,
  hasError
}) => {
  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, '');
    inputValue = inputValue.slice(0, 8);
    
    let formatted = '';
    if (inputValue.length > 0) {
      formatted += inputValue.substring(0, 4);
      if (inputValue.length > 4) {
        formatted += '.' + inputValue.substring(4, 6);
      }
      if (inputValue.length > 6) {
        formatted += '.' + inputValue.substring(6, 8);
      }
    }

    onChange(formatted);
  };

  return (
    <SignUpInput
      label="생년월일"
      type="text"
      name="birthDate"
      value={value}
      onChange={handleBirthDateChange}
      placeholder="YYYY.MM.DD"
      hasError={hasError}
    />
  );
}; 