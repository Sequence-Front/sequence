import React from "react";
import styled from "styled-components";
import MainPageTitle from "../component/MainPageTitle";
import BenefitImg1 from '../../asset/image/Benefit1.png'
import BenefitImg2 from '../../asset/image/Benefit2.png'
import BenefitImg3 from '../../asset/image/Benefit3.png'
import Logo from "../../asset/image/MainLogo.png"

const Container = styled.div`
  display: flex;
  position: relative;
  width: 64%;
  margin : 0 auto;
  flex-direction: column;
  @media (max-width: 800px) {
    width: 90%;
    margin: 0 auto;
  }
`

const BenefitContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin-top: 21rem;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column; 
    align-items: center;
    margin-top: 3rem;
    gap: 2rem;
  }
`

const BenefitImg = styled.img`
  display: flex;
  width: 20%;
  min-width: 250px;
  max-width: 600px;
  max-height: 1400px;
  object-fit: contain;

  @media (max-width: 800px) {
    align-items: flex-end;
  }
`

const BenefitPartContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  margin: 05%;
  min-width: 300px;

  @media (max-width: 800px) {
    width: 90%;
    margin-right: 0;
    margin-top: 2rem;
  }
`

const BenefitPartLogo = styled.img`
  display : flex;
  width: 10%;
  margin-top: 10rem;
  align-self: flex-start;

  @media (max-width: 800px) {
    margin-top: 0.5rem;
  }
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  align-items: flex-start; 
  justify-content: flex-end;
  flex-grow: 1; 

  @media (max-width: 800px) {
    margin-top: 1rem;
    align-items: center;
    justify-content: center;
  }
`

const BenefitPartTitle = styled.div`
  display: flex;
  color: #EEEEEE;
  font-size: clamp(2rem, 3vw, 2.5rem);
  font-weight: bold;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  word-break: keep-all;
  white-space: nowrap;
  line-height: 1.5;

  @media (max-width: 800px) {
    justify-content: flex-start;
    font-size: 2rem;
  }
`

const BenefitPartContent = styled.div`
  color: #EEEEEE;
  font-size: clamp(1.2rem, 2vw, 3rem);
  margin: 5rem 0;
  width: 85%;
  align-items: flex-start;
  word-break: keep-all;
  white-space: pre-wrap;
  line-height: 1.5;

  @media (max-width: 800px) {
    text-align: start;
    justify-content: flex-start;
    margin-top : 1rem;
    width: 100%;
  }
`

function Benefit(){
    return (
        <Container>
            <MainPageTitle>Benefit</MainPageTitle>
            <BenefitContainer>
                <BenefitImg src = {BenefitImg1}/>
                <BenefitPartContainer>
                    <BenefitPartLogo src = {Logo}/>
                    <BottomContainer>
                      <BenefitPartTitle> 개발자와 디자이너의 만남</BenefitPartTitle>
                      <BenefitPartContent>
                      각기 다른 분야의 대학생들이 모여 
                      협업할 수 있는 프로젝트를 시작합니다.
                      </BenefitPartContent>
                    </BottomContainer>
                </BenefitPartContainer>
            </BenefitContainer>
            <BenefitContainer>
                <BenefitImg src = {BenefitImg2}/>
                <BenefitPartContainer>
                    <BenefitPartLogo src = {Logo}/>
                    <BottomContainer>
                      <BenefitPartTitle> 실제 서비스를 세상에</BenefitPartTitle>
                      <BenefitPartContent>
                      여러분이 만든 웹/앱 서비스가 실제로 세상에 출시되어
                      사용자들의 피드백을 받을 수 있는 경험을 제공합니다.
                      </BenefitPartContent>
                    </BottomContainer>
                </BenefitPartContainer>
            </BenefitContainer>
            <BenefitContainer>
                <BenefitImg src = {BenefitImg3}/>
                <BenefitPartContainer>
                      <BenefitPartLogo src = {Logo}/>
                      <BottomContainer>
                      <BenefitPartTitle> 실무에서 필요한 협업 경험</BenefitPartTitle>
                      <BenefitPartContent style={{width: '100%'}}>
                      대학생들이 다양한 직무와 협업하며
                      실무에서 요구되는 경험을 쌓을 수 있습니다.
                      </BenefitPartContent>
                    </BottomContainer>
                </BenefitPartContainer>
            </BenefitContainer>
        </Container>
    );
}

export default Benefit;