//2024-11-28 02:20 정준용완성
import React from 'react';
import styled from 'styled-components';
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #151515;
`

const ContentContainer = styled.div`
  display: flex;
  width: 533px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const SequenceContainer = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
`

const Logo = styled.img`
  display: flex;
  position: relative;
  width: 100%;
  margin-right: 5px;
`
const Message = styled.h1`
  font-size: 48px;
  width: 100%;
  color: #FAFAFA;
  margin-bottom: 10rem;
  font-family: 'SUIT', sans-serif;
`

const StartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  width: 100%;
  background: none;
  color: red;
  font-size: 30px;
  font-family: 'SUIT', sans-serif;
  padding: 0.8rem 6rem;
  cursor: pointer;

  &:hover {
    background-color: red;
    color: white;
  }
`

const SignUpComplete = () => {
  const  navigate = useNavigate();
    return (
      <div style={{backgroundColor:"#151515", height:"100vh"}}>
        <Container>
          <ContentContainer>
            <SequenceContainer>
              <Logo src="/image/Sequence.svg"/>
            </SequenceContainer>
        <Message>회원가입이 완료되었습니다!</Message>
        <StartButton onClick={()=>navigate('/')}>
          시작하기
          <AiOutlineArrowRight style={{marginLeft: '2rem', fontSize: "3rem"}}/>
        </StartButton>
        </ContentContainer>
      </Container>
      </div>
    );
};

export default SignUpComplete;