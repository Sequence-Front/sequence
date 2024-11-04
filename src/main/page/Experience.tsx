import React from "react";
import styled from "styled-components";
import ExperienceItem from "../component/ExperienceItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LogoS from "../../asset/image/LogoS.png"
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

    const settings = {
        infinite: true,
        speed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        centerMode: false,
        autoplay: true,
        autoplaySpeed: 0,
        pauseOnHover: false,
        cssEase: "linear",
        responsive: [
          {
            breakpoint: 1800,
            settings: {
                slidesToShow: 3,
            }
          },
          {
            breakpoint: 1500,
            settings: {
                slidesToShow: 2,
            }
          },
          {
              breakpoint: 1000,
              settings: {
                  slidesToShow: 1,
              }
          }
        ]
    };

    return (
      <>
        <Container>
            <MainPageTitle>Experience</MainPageTitle>
        </Container>
        <SliderWrapper>
            <Slider {...settings}>
                {experiences.map((exp, index) => (
                    <ExperienceItem 
                        key={index}
                        title={exp.title}
                        description={exp.description}
                    />
                ))}
            </Slider>
        </SliderWrapper>
        <Blank/>
        <ImageWrapper>
        <Image 
          src={LogoS}
          alt="LogoS"
          />
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
