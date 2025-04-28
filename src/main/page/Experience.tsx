import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ExperienceItem from "../component/ExperienceItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainPageTitle from "../component/MainPageTitle";

const Container = styled.div`
    width: 64%;
    background-color: #151515;
    margin: 0 auto;
`;

const SliderWrapper = styled.div`
    margin: 4rem auto;
    overflow: hidden;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 131px;
  height: 329px;
  object-fit: cover;
  margin-bottom: 4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`; 

const Button = styled.button`
  width: 100%;
  max-width: 1219px;
  min-width: 320px;
  height: 100px;
  border: none;
  background-color: #424242;
  color: #EEEEEE;
  font-family: 'Noto Sans', sans-serif;
  font-weight: 550;
  padding: 0 2rem;
  margin: 0 2rem;
  
  font-size: clamp(1.25rem, 2vw, 2rem);
`;

const Blank = styled.div`
    height: 450px;
    background-color: #151515;
`;

function Experience() {
    const experiences = Array.from({ length: 10 }, (_, index) => ({
        title: `DANJAM ${index + 1}`,
        description: `기숙사생을 위한 메이트 매칭 및\n동네 커뮤니티 서비스 ${index + 1}`,
    }));
    
    const [isDragging, setIsDragging] = useState(false);
    const [mouseDownTime, setMouseDownTime] = useState(0);
    const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });
    const sliderRef = useRef<Slider>(null);
    const sliderWrapperRef = useRef<HTMLDivElement>(null);

    const settings = {
      infinite: true,
      slidesToShow: 4.5,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      centerMode: false,
      autoplay: false,
      cssEase: "linear",
      initialSlide: -0.5,
      startIndex: 0,
      swipeToSlide: true,
      speed: 500,
      responsive: [
        {
          breakpoint: 1800,
          settings: {
              slidesToShow: 3.5,
          }
        },
        {
          breakpoint: 1500,
          settings: {
              slidesToShow: 2.5,
          }
        },
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 1.5,
            }
        }
      ]
    };

    // 마우스 이벤트 핸들러
    const handleMouseDown = (e: React.MouseEvent) => {
      setMouseDownTime(Date.now());
      setMouseDownPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = (e: React.MouseEvent) => {
      const mouseUpTime = Date.now();
      const mouseUpPosition = { x: e.clientX, y: e.clientY };
      
      // 마우스 다운과 업 사이의 시간 차이
      const timeDiff = mouseUpTime - mouseDownTime;
      
      // 마우스 다운과 업 사이의 거리 차이
      const distanceX = Math.abs(mouseUpPosition.x - mouseDownPosition.x);
      const distanceY = Math.abs(mouseUpPosition.y - mouseDownPosition.y);
      
      // 시간이 짧고(300ms 이하) 거리가 작으면(10px 이하) 클릭으로 간주
      if (timeDiff < 300 && distanceX < 10 && distanceY < 10) {
        // 클릭 이벤트 처리
        const target = e.target as HTMLElement;
        const experienceItem = target.closest('.experience-item');
        
        if (experienceItem) {
          // 여기에 클릭 시 수행할 작업 추가
          console.log('Experience item clicked');
        }
      }
    };

    return (
      <>
        <Container>
            <MainPageTitle>Experience</MainPageTitle>
        </Container>
        <SliderWrapper 
          ref={sliderWrapperRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
            <Slider ref={sliderRef} {...settings}>
                {experiences.map((exp, index) => (
                    <ExperienceItem 
                        key={index}
                        title={exp.title}
                        description={exp.description}
                        className="experience-item"
                    />
                ))}
            </Slider>
        </SliderWrapper>
        <Blank/>
        <ImageWrapper>
        <Image src="/image/LogoS.png" alt="LogoS"/>
        </ImageWrapper>
        <ButtonWrapper>
            <Button>
              새로운 시퀀스를 만들어보세요!
            </Button>
        </ButtonWrapper>
      </>
    );
}

export default Experience;
