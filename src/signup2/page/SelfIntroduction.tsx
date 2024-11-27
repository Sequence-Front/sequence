//2024-11-28 02:20 정준용완성
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #151515;
  color: white;
  width: 100%;
`
    

const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
`

const Introduce = styled.textarea`
  width: 100%;
  height: clamp(10rem, 20vw, 20rem);
  background-color: #212121;
  color: white;
  border: none;
  padding: clamp(0.5rem, 1vw, 15px);
  font-size: clamp(10px, 1.2vw, 1.3rem);
  resize: none;

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
  right: -5px;
  color: #616161;
  font-size: 12px;
`

interface SelfIntroductionProps {
  onDataChange: (data: string) => void;
}

const SelfIntroduction = ({onDataChange}: SelfIntroductionProps) => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      setText(e.target.value);
    }
  };

  useEffect(() => {
    onDataChange(text);
  }, [text, onDataChange]);


  return (
    <Container>
      <TextAreaContainer>
        <Introduce
          value={text}
          onChange={handleChange}
          placeholder="팀원을 모집할 때 참고할 자기소개를 500자 이내로 적어주세요!"
        />
      <CharacterCount>
        {text.length}/{500}
      </CharacterCount>
      </TextAreaContainer>
    </Container>
  );
};

export default SelfIntroduction;
