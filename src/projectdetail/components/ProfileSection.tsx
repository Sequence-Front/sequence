import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import {SectionTitle, Section, DescriptionWrapper} from '../style/styles';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

interface ProfileSectionProps {
  profileData: Array<{
    profileImgUrl: string | null;
    nickname: string;
  }>;
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
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [mouseDownTime, setMouseDownTime] = useState(0);
  const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });
  const sliderRef = useRef<Slider>(null);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);

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
      const profileCard = target.closest('.profile-card');
      
      if (profileCard) {
        const nickname = profileCard.getAttribute('data-nickname');
        if (nickname) {
          navigate(`/mypage?nickname=${nickname}`);
        }
      }
    }
  };

  return (
    <Section>
      <SectionTitle>Profile</SectionTitle>
      <DescriptionWrapper>소속 팀원들의 프로필을 확인해보세요.</DescriptionWrapper>
      <SliderWrapper 
        ref={sliderWrapperRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <Slider ref={sliderRef} {...settings}>
          {profileData.map((member, index) => (
            <ProfileCard 
              key={index} 
              className="profile-card"
              data-nickname={member.nickname}
            >
              <ProfileImage 
                src={member.profileImgUrl || '/default-profile-image.png'} 
                alt={member.nickname} 
              />
              <ProfileInfo>
                <h3>{member.nickname}</h3>
              </ProfileInfo>
            </ProfileCard>
          ))}
        </Slider>
      </SliderWrapper>
    </Section>
  );
};

export default ProfileSection;