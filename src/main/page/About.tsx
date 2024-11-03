import React from 'react';
import styled from 'styled-components';
import MainPageTitle from '../component/MainPageTitle';
import AboutImg1 from '../../asset/image/About1.png';
import AboutImg2 from '../../asset/image/About2.png'
import AboutImgCenter from '../../asset/image/LogoEmpty.png'

const Container = styled.div`
  position: relative;
  width: 75%;
  height: 70%;
  margin : 0 auto;
  margin-left : 15%;
  margin-right: 10%;
  flex-direction: column;
`

const About1Container = styled.div`
  display: flex;
  margin-top: 7rem;
  position: relative;
  flex-direction: row;
  z-index: 0;
`

const About1Img = styled.img`
  display : flex;
  width: 54%;
`

const About1Content = styled.div`
  display : flex;
  width : 46%;
  color : #EEEEEE;
  font-size : clamp(1rem, 1.5vw, 2rem);
  align-items: flex-end;
`

const AboutCenterImg = styled.img`
  display: flex;
  position: relative;
  width: 60%;
  margin: -12vw auto;
  z-index: 1;
`

const About2Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  z-index: 0;
`

const About2Img = styled.img`
  display : flex;
  width: 54%;
`

const About2Content = styled.div`
  display : flex;
  margin-left: 1%;
  width : 45%;
  color : #EEEEEE;
  font-size : clamp(1rem, 1.5vw, 2rem);
  align-items: flex-start;
`

function About() {
  return (
    <Container>
      <MainPageTitle>About</MainPageTitle>
      <About1Container>
        <About1Content>
          시퀀스는 IT 서비스 개발을 원하는
          <br />
          개발, 디자인 부문의 대학생들이 모여
          <br />
          함께 프로젝트를 진행하는 공간입니다.
        </About1Content>
        <About1Img src = {AboutImg1}/>
      </About1Container>
      <AboutCenterImg src = {AboutImgCenter}/>
      <About2Container>
        <About2Img src = {AboutImg2} />
        <About2Content>
        영화의 주제와 인물들을 소개하는 시퀀스처럼,
        <br />
        우리의 만남과 협업이 하나의 영화와 같이 
        <br />
        새로운 이야기를 만들어내는 것을 목표로 하고 있습니다.
        </About2Content>
      </About2Container>
    </Container>
  );
}

export default About;