// 2024-11-18 18:09 승균 작성
import React, { useState } from 'react';
import styled from 'styled-components';
import { CiBookmark } from "react-icons/ci";
import { PiSirenThin } from "react-icons/pi";

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  gap: clamp(20px, 3vw, 40px);
  min-height: clamp(250px, 30vw, 400px);
  margin-bottom: 60px;
  
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    height: auto;
    margin-bottom: 40px;
  }
`;

const ImageSection = styled.div`
  width: clamp(250px, 30vw, 400px);
  height: clamp(250px, 30vw, 400px);
  background-color: #D9D9D9;
  flex-shrink: 0;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: clamp(250px, 30vw, 400px);
  
  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    gap: 20px;
  }
`;

const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const Name = styled.div`
  font-size: clamp(24px, 3vw, 36px);
  font-weight: bold;
  margin: 0;
`;

const Birth = styled.p`
  color: #ffffff;
  margin: clamp(5px, 1vw, 10px) 0;
  font-size: clamp(20px, 1.5vw, 22px);
  font-weight: bold;
`;

const Introduction = styled.p`
  color: #ffffff;
  margin: clamp(5px, 1vw, 10px) 0;
  font-size: clamp(14px, 1.5vw, 18px);
  font-weight: bold;
`;

const IconContainer = styled.div`
  display: flex;
  gap: clamp(10px, 1vw, 15px);
  
  svg {
    width: clamp(32px, 3vw, 40px);
    height: clamp(32px, 3vw, 40px);
    color: #FF0000;
    cursor: pointer;
    transition: color 0.2s;
    
    &:hover {
      color: #FF4444;
    }
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(8px, 1vw, 12px);
`;

const SkillTag = styled.div`
  background-color: transparent;
  border: 1px solid #D9D9D9;
  width: clamp(85px, 15vw, 30px);
  height: clamp(35px, 4vw, 30px);
  border-radius: 25px;
  font-size: clamp(16px, 1.2vw, 18px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 clamp(10px, 1vw, 15px);
`;

const BadgesContainer = styled.div`
  display: flex;
  gap: clamp(15px, 1.5vw, 20px);
  flex-wrap: wrap;
`;

const Badge = styled.div`
  width: clamp(40px, 4vw, 50px);
  height: clamp(40px, 4vw, 50px);
  background-color: #D9D9D9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(20px, 2vw, 24px);
`;

const Hope = styled.p`
  background-color: transparent;
  border: 1px solid #D9D9D9;
  border-radius: 25px;
  font-size: clamp(14px, 1.2vw, 16px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(3px, 0.5vw, 5px) clamp(10px, 0.5vw, 20px);
`;

const Section = styled.div`
  background-color: #212121;
  padding: clamp(15px, 2vw, 25px);
  display: flex;
  flex-direction: column;
  gap: clamp(15px, 2vw, 20px);
  margin-top: auto;
  
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const SectionContent = styled.div`
  display: flex;
  gap: clamp(15px, 2vw, 20px);
  align-items: flex-start;
  font-weight: bold;
  font-size: clamp(18px, 1.2vw, 20px);
`;

const SectionTitle = styled.div`
  color: #ffffff;
  font-size: clamp(14px, 1.2vw, 16px);
  min-width: clamp(80px, 10vw, 100px);
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const HopeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: clamp(8px, 1vw, 12px);
`;

const dummyData = {
  name: "박소현 님",
  introduction: "홍익대학교 (세종) 디자인컨버전스학부 4학년 휴학",
  birth: "2002.01.07.",
  skills: ["React", "Node.js", "Next.js", "Nest.js", "Flutter", "React-native", "JavaScript", "TypeScript"],
  badges: [1, 2, 3, 4, 5, 6, 7], // 7개의 뱃지를 위한 더미 데이터
  hope: ["UX/UI 디자이너","기획","Branding 디자이너"]
};

type UserDataType = {
    name: string;
    introduction: string;
    birth: string;
    skills: string[];
    badges: number[];
    hope: string[];
}

const Profile = () => {
  const [userData, setUserData] = useState<UserDataType>(dummyData);

//   useEffect(() => {
//     const fetchUserData = async () => {
    // 프로필 정보 가져오기
      
//       setUserData(data);
//     };

    //fetchUserData();
//   }, []);

  return (
    <ProfileContainer>
      <ImageSection />
      <InfoSection>
        <TopInfo>
          <div>
            <div style={{display: "flex", gap: "20px"}}>
              <Name>{userData.name}</Name>
              <Birth>{userData.birth}</Birth>
            </div>
            <Introduction>{userData.introduction}</Introduction>
          </div>
          <IconContainer>
            <CiBookmark size={40} />
            <PiSirenThin size={40} />
          </IconContainer>
        </TopInfo>
        
        <Section>
          <SectionContent>
            <SectionTitle>보유스킬</SectionTitle>
            <ContentWrapper>
              <SkillsContainer>
                {userData.skills.map((skill, index) => (
                  <SkillTag key={index}>{skill}</SkillTag>
                ))}
              </SkillsContainer>
            </ContentWrapper>
          </SectionContent>

          <SectionContent>
            <SectionTitle>획득뱃지</SectionTitle>
            <ContentWrapper>
              <BadgesContainer>
                {userData.badges.map((_, index) => (
                  <Badge key={index}>🏆</Badge>
                ))}
              </BadgesContainer>
            </ContentWrapper>
          </SectionContent>

          <SectionContent>
            <HopeContainer>
            {userData.hope.map((_, index) => (
                  <Hope key={index}>{_}</Hope>
                ))}
            를 희망해요!
            </HopeContainer>
          </SectionContent>
        </Section>
      </InfoSection>
    </ProfileContainer>
  );
};

export default Profile; 