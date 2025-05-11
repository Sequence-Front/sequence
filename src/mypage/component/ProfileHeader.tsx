// 2024-11-18 18:09 승균 작성
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CiBookmark } from "react-icons/ci";
import { PiSirenThin } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { postLogout } from "../../api/logout";

const ProfileContainer = styled.div`
  display: flex;
  width: 75%;
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
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  margin-bottom: 0.5rem;
`;

const Name = styled.div`
  font-size: clamp(2rem, 2.2vw, 3rem);
  font-weight: bold;
`;

const Birth = styled.div`
  color: #ffffff;
  font-size: clamp(20px, 1.5vw, 22px);
  font-weight: bold;
`;

const School = styled.div`
  color: #e0e0e0;
  margin: clamp(5px, 0.5vw, 0.5rem) 0;
  font-size: clamp(14px, 1.5vw, 18px);
  font-weight: bold;
  white-space: nowrap;
`;

const IconContainer = styled.div`
  display: flex;
  gap: clamp(10px, 1vw, 15px);

  svg {
    width: clamp(32px, 3vw, 40px);
    height: clamp(32px, 3vw, 40px);
    color: #ff0000;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #ff4444;
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
  border: 1px solid #d9d9d9;
  height: clamp(30px, 2vw, 2rem);
  border-radius: 25px;
  font-size: clamp(10px, 1.2vw, 18px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 clamp(0.5rem, 1vw, 1rem);

  @media (max-width: 1000px) {
    height: clamp(2rem, 3vw, 2.5rem);
    font-size: clamp(1rem, 1.2vw, 18px);
  }
`;

const BadgesContainer = styled.div`
  display: flex;
  flex: 1;
`;

const Badge = styled.div`
  display: flex;
  width: clamp(1rem, 2.5vw, 2.5rem);
  height: clamp(1rem, 2.5vw, 2.5rem);
  margin: 0.5rem clamp(0.2rem, 0.5vw, 0.5rem);
  background-color: #d9d9d9;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-size: clamp(0.8rem, 1.5vw, 1.5rem);

  @media (max-width: 1000px) {
    width: clamp(2rem, 3vw, 2.5rem);
    height: clamp(2rem, 3vw, 2.5rem);
    font-size: clamp(1.3rem, 1.5vw, 1.5rem);
  }
`;

const Hope = styled.p`
  background-color: transparent;
  border: 1px solid #d9d9d9;
  border-radius: 25px;
  font-size: clamp(0.5rem, 1vw, 2rem);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(3px, 0.5vw, 5px) clamp(10px, 0.5vw, 20px);

  @media (max-width: 1000px) {
    display: flex;
    height: clamp(2rem, 3vw, 2.5rem);
    font-size: clamp(1rem, 1.2vw, 18px);
  }
`;

const Section = styled.div`
  display: flex;
  flex: 1;
  background-color: #212121;
  flex-direction: column;
  padding: clamp(0.5rem, 1.5vw, 1.5rem);
  justify-content: space-between;

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

  @media (max-width: 1000px) {
    margin-top: 10px;
  }
`;

const SectionTitle = styled.div`
  color: #ffffff;
  font-size: clamp(14px, 1.2vw, 16px);
  min-width: clamp(80px, 10vw, 100px);
  font-weight: bold;

  @media (max-width: 1000px) {
    font-size: 1rem;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const HopeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: clamp(8px, 1vw, 12px);
  font-size: clamp(1rem, 1.4vw, 1.4rem);
  @media (max-width: 1000px) {
    font-size: 1.25rem;
  }
`;

interface ProfileProps {
  name?: string;
  birth?: string;
  skills?: string[];
  desiredJobs?: string[];
  schoolname?: string;
  image?: string;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  birth,
  skills,
  desiredJobs,
  schoolname,
  image
}) => {
  const navigate = useNavigate();
  const localNickname = localStorage.getItem("nickname");
  const formatBirth = (birth?: string) => {
    if (!birth) return "";
    const date = new Date(birth);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")}.`;
  };
  const handleLogout = async () => {

    if(window.confirm("로그아웃 하시겠습니까?")){
      try {
        const response = await postLogout();
        console.log("로그아웃 response", response);
        localStorage.clear();
        alert("로그아웃 되었습니다.");
        navigate("/login");
      } catch (error) {
        console.log("error: ", error);
        console.log("로그아웃 엑세스토큰 ", localStorage.getItem("accessToken"));
      }
    }
  };
  return (
    <ProfileContainer>
      <ImageSection>
        {image && <img src={image} alt="프로필 이미지" />}
      </ImageSection>
      <InfoSection>
        <TopInfo>
          <div>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Name>{name ? `${name}` : "로딩중..."}</Name>
              <Birth>{formatBirth(birth)}</Birth>
            </div>
            <School>{schoolname}</School>
          </div>
          <IconContainer>
            <CiBookmark size={40} />
            <PiSirenThin size={40} />
            {name === localNickname && (
              <IoIosLogOut
                title="로그아웃"
                style={{ color: "#FF0000", cursor: "pointer", fontSize: "1px" }}
                onClick={handleLogout}
              />
            )}
          </IconContainer>
        </TopInfo>

        <Section>
          <SectionContent>
            <SectionTitle>보유스킬</SectionTitle>
            <ContentWrapper>
              <SkillsContainer>
                {skills?.map((skill, index) => (
                  <SkillTag key={index}>{skill}</SkillTag>
                ))}
              </SkillsContainer>
            </ContentWrapper>
          </SectionContent>

          {/* <SectionContent>
            <SectionTitle>획득뱃지</SectionTitle>
            <ContentWrapper>
              <BadgesContainer>
                  뱃지 없어서 주석처리      
              </BadgesContainer>
            </ContentWrapper>
          </SectionContent> */}

          <SectionContent>
            <HopeContainer>
              {desiredJobs?.map((job, index) => (
                <Hope key={index}>{job}</Hope>
              ))}
              {desiredJobs && desiredJobs.length > 0 && "를 희망해요!"}
            </HopeContainer>
          </SectionContent>
        </Section>
      </InfoSection>
    </ProfileContainer>
  );
};

export default Profile;
