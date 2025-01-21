import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
`

const TextArea = styled.textarea`
  width: 100%;
  height: clamp(13rem, 26vw, 26rem);
  background-color: #212121;
  color: white;
  border: none;
  padding: clamp(0.5rem, 1vw, 15px);
  font-size: clamp(10px, 1.2vw, 1.3rem);
  resize: none;
  box-sizing: border-box;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
    border: 1px solid #757575;
    box-shadow: #212121;
  }
`

const CharacterCount = styled.div`
  position: absolute;
  bottom: clamp(5px, 1vw, 10px);
  right: 5px;
  color: #616161;
  font-size: 12px;
`

interface TextAreaWithCounterProps {
  value: string;
  maxLength: number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaWithCounter = ({
  value,
  maxLength,
  placeholder,
  onChange,
}: TextAreaWithCounterProps) => {
  return (
    <Container>
      <TextArea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <CharacterCount>
        {value.length}/{maxLength}
      </CharacterCount>
    </Container>
  );
};

export default TextAreaWithCounter;