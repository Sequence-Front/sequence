import React from 'react';
import styled from 'styled-components';
import PartnerImage from "../../asset/image/PartnerImage.png"
import MainPageTitle from '../component/MainPageTitle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 64%;
  margin: 0 auto;
  background-color: #151515;

  @media (max-width: 800px) {
    width: 90%;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  margin-bottom: 4rem;
  @media (max-width: 800px) {
    margin-bottom: 0.5rem;
  }
`;

const ContentSection = styled.div`
  width: 100%;
  margin-top: 2rem;
  text-align: left;

  @media (min-width: 768px) {
    margin-top: 3rem;
  }
`;

const SubTitle = styled.div`
  font-family: 'Noto Sans', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: #e5e6e8;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3.5rem;
  }
`;

const Description = styled.p`
  font-family: 'Noto Sans', sans-serif;
  font-size: 1rem;
  color: #e5e6e8;
  line-height: 1.75;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

function Partner() {
  return (
    <Container>
      <MainPageTitle>Partner</MainPageTitle>
      <ImageWrapper>
        <Image 
          src={PartnerImage}
          alt="PartnerImage"
        />
        <ContentSection>
          <SubTitle>Underdog Revolution</SubTitle>
          <Description>
            세종시 청년 개발자들이 모인 언더독 레볼루션은<br />
            청년들의 IT기반 스타트업 생태계를 만들어가자는 목표를 가지고 있습니다.<br />
            청년들의 활발한 청년창업이 진정한 의미의 실리콘 밸리의 시작이라 정의하고<br />
            청년창업 활성화를 위한 다양한 활동을 전개합니다.
          </Description>
        </ContentSection>
      </ImageWrapper>
    </Container>
  );
}

export default Partner;
