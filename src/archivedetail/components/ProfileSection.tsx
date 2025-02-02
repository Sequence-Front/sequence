import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import {SectionTitle, Section, DescriptionWrapper} from '../style/styles';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProfileSectionProps {
  profileData: any;
}

const SliderWrapper = styled.div`
  margin: 2rem 0;
  .slick-slide {
    padding: 0 10px;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .slick-track {
    display: flex !important;
    align-items: center;
  }
`;

const ProfileCard = styled.div`
  width: 300px;
  height: 200px;
  background-color: #606060;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #212121;
  background-color: #E53935;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 1;
  }
  
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
    color: #212121;
  }
  
  p {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
    padding: 0.5rem 1rem;
    border: 2px solid #212121;
    border-radius: 20px;
    color: #212121;
  }
`;

const ProfileSection = ({profileData}: ProfileSectionProps) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <Section>
      <SectionTitle>Profile</SectionTitle>
      <DescriptionWrapper>소속 팀원들의 프로필을 확인해보세요.</DescriptionWrapper>
      <SliderWrapper>
        <Slider {...settings}>
          {profileData.name.map((name: string, index: number) => (
            <ProfileCard key={index}>
              <ProfileImage src={profileData.userImage[index]} alt={name} />
              <ProfileInfo>
                <h3>{profileData.name[index]}</h3>
                <p>{profileData.role[index]}</p>
              </ProfileInfo>
            </ProfileCard>
          ))}
        </Slider>
      </SliderWrapper>
    </Section>
  );
};

export default ProfileSection;