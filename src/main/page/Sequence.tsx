import React from "react";
import styled from "styled-components";
import runningimg from '../../asset/image/running.png'
import { BsArrowRight } from "react-icons/bs";

const SequenceContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
`

const Title = styled.div`
  font-size: clamp(10rem, 23.5vw, 100vw);
  color: red;
  font-family: 'Impact', sans-serif;
  font-weight: 100px;
  margin: 0;
  top: 5vw;
  z-index: 1;
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
  padding: clamp(1rem, 1.5rem , 2rem) clamp(5rem, 4vw, 10rem);
  font-size: clamp(1.75rem, 1.7vw, 3.5rem);
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
                <Title>Sequence</Title>
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