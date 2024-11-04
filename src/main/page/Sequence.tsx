import React from "react";
import styled from "styled-components";
import runningimg from '../../asset/image/running.png'
import LogoS from '../../asset/image/LogoS.png'
import { BsArrowRight } from "react-icons/bs";

const SequenceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  
`

const TitleContainer = styled.div`
  display:flex;
  margin: 0 auto;
  flex-direction: row;
  align-items: flex-end;
  z-index: 1;
`

const Logo = styled.img`
  display: flex;
  position: relative;
  width: clamp(1rem, 10vw, 12.5vw);
  margin-bottom: clamp(1rem, 5vw, 10rem);
  margin-right: clamp(0.3rem, 0.5vw, 1rem);
`

const Title = styled.div`
  font-size: clamp(8rem, 23.5vw, 100vw);
  color: #E32929;
  font-family: 'Impact', sans-serif;
  margin: 0;
  align-self: flex-end;
`

const Img = styled.img`
  position: relative;
  margin-top: -15vw;
  display: flex;
  width: 100%;
  z-index: 0;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  background-color: #151515;
  
`

const Content = styled.div`
  font-size: clamp(2rem, 2vw ,4rem);
  color: white;
  font-family: 'Noto Sans', sans-serif;
  font-weight: 700;
  margin-top: 25rem;

`

const Button = styled.button`
  display: flex; 
  align-items: center;
  background: none;
  border: 0.3rem solid red;
  margin-top : 10rem;
  max-width: 120rem;
  color: red;
  padding: clamp(0.5rem, 1vw , 2rem) clamp(1rem, 2vw, 10rem);
  font-size: clamp(1rem, 1.7vw, 3.5rem);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
  white-space: pre;

  &:hover {
    background: red;
    color: white;
  }
`



function Sequence(){
    return (
        <Container>
            <SequenceContainer>
                <TitleContainer>
                  <Logo src={LogoS}/>
                  <Title>equence</Title>
                </TitleContainer>
                <Img src={runningimg}/>
            </SequenceContainer>
            <Content>새로운 이야기를 만들다. 시퀀스</Content>
            <Button>프로젝트 올리고 새로운 이야기를 만들어보세요!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <BsArrowRight style = {{fontSize : 'clamp(4rem, 4vw, 8rem)'}} />
            </Button>
        </Container>
    );
}

export default Sequence;