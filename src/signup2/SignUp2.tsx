//2024-11-28 02:20 정준용완성
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Header from '../asset/component/Header';
import Profile from "./page/Profile";
import Education from "./page/Education";
import Activity from "./page/Activity";
import PersonalHistory from "./page/PersonalHistory";
import Qualification from "./page/Qualification";
import Portfolio from "./page/Portfolio";
import SelfIntroduction from "./page/SelfIntroduction";
import { PageNumber } from "../signup/SignUpPage";
import { Title as STitle } from "../signup/style/SignUpPageStyle";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  width: 70%;
  margin: 0px auto;
  color: white;
  padding: 20px;
  flex-direction: column;
`

const TitleContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 1rem; 
  
`

const Arrow = styled.div`
  position: absolute;
  left: 2rem; 
  top: 50%; 
  transform: translateY(-50%); 
  color: #E32929;
  font-size: clamp(3rem, 5vw, 5rem);
  cursor: pointer;
`

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: clamp(2rem, 4vw, 5rem);
`

const Label = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  font-size: clamp(1rem, 2vw, 1.7rem);

  span {
    align-self: center;
    margin-left: 5px;
    color: red;
  }
`
const Title = styled.div`
  display: flex;
`

const Description = styled.div`
  display: flex;
  font-size: clamp(0.7rem, 1.2vw, 1rem);
  color: #9E9E9E;
  margin-top: 5px;
`
const Content = styled.div`
  flex: 1;
`

const SignUpButton = styled.button<{ isActive: boolean }>`
  display: flex;
  width: clamp(14rem, 20vw, 30rem);
  justify-content: center;
  align-self: center;
  background-color: ${(props) => (props.isActive ? "red" : "#212121")};
  font-size: clamp(0.6rem, 1vw, 2rem);
  color: ${(props) => (props.isActive ? "white" : "#616161")};
  padding: clamp(6px, 1vw, 12px) clamp(12px, 2vw, 24px);
  border: none;
  cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${(props) => (props.isActive ? "#ff5555" : "#212121")};
  }
`

const Tag = styled.button<{ selected: boolean }>`
  all: unset;
  display: inline-block;
  padding: clamp(5px, 1vw, 8px) clamp(8px, 1vw, 13px);
  margin: clamp(5px, 1vw, 7px);
  font-size: clamp(0.7rem, 1.2vw, 1.1rem);
  background-color: ${(props) => (props.selected ? "red" : "#151515")};
  border: 1px solid ${(props) => (props.selected ? "red" : "white")};
  color: ${(props) => (props.selected ? "#151515" : "white")};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background: #777777;
  }
`

const ErrorMessage = styled.div`
  color: red;
  font-size: clamp(0.8rem, 1.5vw, 1.2rem);
  text-align: center;
  margin-bottom: 20px;
`

const SignUp = () => {
  const [skills] = useState<string[]>([
    "Adobe Illustration",
    "Adobe Photoshop",
    "Adobe Indesign",
    "JavaScript",
    "TypeScript",
    "Figma",
    "Adobe Primiere Pro",
    "Adobe XD",
    "Adobe After Effect",
    "Adobe Lightroom",
    "Cinema 4D",
    "ProtoPie",
    "Blender",
  ]);

  const [roles] = useState<string[]>([
    "UX/UI Design",
    "BX Design",
    "Front-end",
    "Back-end",
    "PM",
  ]);

  const [profileData, setProfileData] = useState<{ nickname: string; imageUrl: string | null; duplicateCheck: boolean }>({
    nickname: "",
    duplicateCheck: false,
    imageUrl: null,
  });

  const [educationData, setEducationData] = useState({
    schoolName: "",
    major: "",
    year: "",
    startYear: "",
    endYear: "",
    status: "",
  });

  const [activityData, setActivityData] =  useState<
  {
    type: string;
    name: string;
    startDate: [string, string, string];
    endDate: [string, string, string];
    description: string;
    }[]
  >([]);

  const [personalHistoryData, setPersonalHistoryData] =  useState<
  {
    name: string;
    startDate: [string, string, string];
    endDate: [string, string, string];
    description: string;
  }[]
  >([]);

  const [qualificationData, setQualificationData] = useState<
  {
    type: string;
    name: string;
    date: [string, string, string];
    description: string;
  }[]
  >([]);

  const [portfolioData, setPortfolioData] = useState<
  { id: number; fileName: string | null; fileSize: number | null; url: string }[]
  >([]);

  const [selfIntroduction, setSelfIntroduction] = useState("");

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSkillClick = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRoleClick = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleProfileDataChange = (data: { nickname: string; imageUrl: string | null; duplicateCheck: boolean }) => {
    setProfileData(data);
  };

  const handleActivityDataChange = (
    data: {
      type: string;
      name: string;
      startDate: [string, string, string];
      endDate: [string, string, string];
      description: string;
    }[]
  ) => {
    setActivityData(data);
  };

  const handlePersonalHistoryDataChange = (
    data: {
      name: string;
      startDate: [string, string, string];
      endDate: [string, string, string];
      description: string;
    }[]
  ) => {
    setPersonalHistoryData(data);
  };

  const handleEducationDataChange = (data: {
    schoolName: string;
    major: string;
    year: string;
    startYear: string;
    endYear: string;
    status: string;
  }) => {
    setEducationData(data);
  };

  const handleQualificationDataChange = (
    data: {
      type: string;
      name: string;
      date: [string, string, string];
      description: string;
    }[]
  ) => {
    setQualificationData(data);
  };

  const handlePortfolioDataChange = (
    data: { id: number; fileName: string | null; fileSize: number | null; url: string }[]
  ) => {
    setPortfolioData(data);
  };

  const handleSelfIntroductionChange = (data: string) => {
    setSelfIntroduction(data);
  };

  const validateInputs = useCallback(() => {
    if (profileData.nickname.trim() === "") {
      return "별명을 입력해주세요.";
    }
    if (!profileData.duplicateCheck) {
      return "별명 중복확인이 필요합니다.";
    }
    if (profileData.imageUrl === null) {
      return "프로필 사진을 업로드해주세요.";
    }
    if (educationData.schoolName.trim() === "") {
      return "학교명을 입력해주세요.";
    }
    if (educationData.major.trim() === "") {
      return "전공을 입력해주세요.";
    }
    if (selectedSkills.length === 0) {
      return "스킬을 선택해주세요.";
    }
    if (selectedRoles.length === 0) {
      return "희망 역할을 선택해주세요.";
    }
  
    if (activityData.length === 0) {
      return "";
    }
  
    if (activityData.length > 0) {
      for (const activity of activityData) {
        const isPartiallyFilled =
          activity.type.trim() !== "유형 선택" ||
          activity.name.trim() !== "" ||
          activity.startDate.some((date) => date.trim() !== "") ||
          activity.endDate.some((date) => date.trim() !== "") ||
          activity.description.trim() !== "";
  
        if (isPartiallyFilled) {
          if (activity.type.trim() === "유형 선택") {
            return "경험 및 활동이력의 유형을 선택해주세요.";
          }
          if (activity.name.trim() === "") {
            return "경험 및 활동이력의 제목을 적어주세요.";
          }
          if (
            activity.startDate.some((date) => date.trim() === "") ||
            activity.endDate.some((date) => date.trim() === "")
          ) {
            return "경험 및 활동이력의 활동 기간을 적어주세요.";
          }
          if (activity.description.trim() === "") {
            return "경험 및 활동이력의 경험 내용을 적어주세요.";
          }
        }
      }
    }
  
    if (personalHistoryData.length > 0) {
      for (const personalHistory of personalHistoryData) {
        const isPartiallyFilled =
          personalHistory.name.trim() !== "" ||
          personalHistory.startDate.some((date) => date.trim() !== "") ||
          personalHistory.endDate.some((date) => date.trim() !== "") ||
          personalHistory.description.trim() !== "";
  
        if (isPartiallyFilled) {
          if (personalHistory.name.trim() === "") {
            return "경력의 회사명을 적어주세요.";
          }
          if (
            personalHistory.startDate.some((date) => date.trim() === "") ||
            personalHistory.endDate.some((date) => date.trim() === "")
          ) {
            return "경력의 활동 기간을 적어주세요.";
          }
          if (personalHistory.description.trim() === "") {
            return "경력의 근무 내용을 적어주세요.";
          }
        }
      }
    }
  
    if (qualificationData.length > 0) {
      for (const qualification of qualificationData) {
        const isPartiallyFilled =
          qualification.type.trim() !== "유형 선택" ||
          qualification.name.trim() !== "" ||
          qualification.date.some((date) => date.trim() !== "") ||
          qualification.description.trim() !== "";
  
        if (isPartiallyFilled) {
          if (qualification.type.trim() === "유형 선택") {
            return "자격 및 수상의 유형을 선택해주세요.";
          }
          if (qualification.name.trim() === "") {
            return "자격 및 수상의 이름을 적어주세요.";
          }
          if (qualification.date.some((date) => date.trim() === "")) {
            return "자격 및 수상의 취득 날짜를 적어주세요.";
          }
          if (qualification.description.trim() === "") {
            return "자격 및 수상의 자격증 및 수상명을 적어주세요.";
          }
        }
      }
    }

    for (const portfolio of portfolioData) {
      if (portfolio.fileSize !== null && portfolio.fileSize > 50) {
        return "포트폴리오 파일 크기는 50MB를 초과할 수 없습니다.";
      }
    }

    return "";
  }, [profileData, educationData, selectedSkills, selectedRoles, activityData, personalHistoryData, qualificationData, portfolioData]);
  
  useEffect(() => {
    setErrorMessage(validateInputs());
  }, [profileData, educationData, selectedSkills, selectedRoles, activityData, personalHistoryData, qualificationData, portfolioData, validateInputs]);
  

  const handleSignUp = () => {
    const validationError = validateInputs(); 
    if (validationError) {
      setErrorMessage(validationError); 
      return; 
    }
    console.log("프로필:", profileData);
    console.log("학력:", educationData);
    console.log("스킬:", selectedSkills);
    console.log("역할:", selectedRoles);
    console.log("경험 및 활동 이력:", activityData);
    console.log("경력:", personalHistoryData);
    console.log("자격 및 수상:", qualificationData);
    console.log("포트폴리오", portfolioData);
    console.log("자기소개", selfIntroduction);
    navigate('/signup3')
  };

  const isValid =
    profileData.nickname.trim() !== "" &&
    profileData.imageUrl !== null &&
    educationData.schoolName.trim() !== "" &&
    educationData.major.trim() !== "" &&
    selectedSkills.length > 0 &&
    selectedRoles.length > 0;

  const  navigate = useNavigate();
  return (
    <div style={{ backgroundColor: "#151515" }}>
      <Header headerName="SignUp" />
      <TitleContainer>
        <Arrow>
          <AiOutlineArrowLeft  onClick = {()=>navigate('/signup1')}/>
        </Arrow>
        <STitle>회원가입</STitle>
        <PageNumber>2/2</PageNumber>
      </TitleContainer>
      <Container>
        <ContentContainer>
          <Label>
            <Title>
            프로필 사진<span>*</span>
            </Title>
          </Label>
          <Content>
            <Profile onDataChange={handleProfileDataChange} />
          </Content>
        </ContentContainer>
        <ContentContainer>
          <Label>
            <Title>
            학력<span>*</span>
            </Title>
          </Label>
          <Content>
            <Education onDataChange={handleEducationDataChange} />
          </Content>
        </ContentContainer>
        <ContentContainer>
          <Label>
            <Title>
            스킬<span>*</span>
            </Title>
            <Description>복수 선택</Description>
          </Label>
          <Content>
            {skills.map((skill) => (
              <Tag
                key={skill}
                selected={selectedSkills.includes(skill)}
                onClick={() => handleSkillClick(skill)}
              >
                {skill}
              </Tag>
            ))}
          </Content>
        </ContentContainer>
        <ContentContainer>
          <Label>
            <Title>
            희망 역할<span>*</span>
            </Title>
            <Description>복수 선택</Description>
          </Label>
          <Content>
            {roles.map((role) => (
              <Tag
                key={role}
                selected={selectedRoles.includes(role)}
                onClick={() => handleRoleClick(role)}
              >
                {role}
              </Tag>
            ))}
          </Content>
        </ContentContainer>
        <ContentContainer>
          <Label>경험 및 활동 이력</Label>
          <Content>
            <Activity onDataChange={handleActivityDataChange} />
          </Content>
        </ContentContainer>
        <ContentContainer>
          <Label>경력</Label>
          <Content>
            <PersonalHistory onDataChange={handlePersonalHistoryDataChange} />
          </Content>
        </ContentContainer>
        <ContentContainer>
          <Label>자격 및 수상</Label>
          <Content>
          <Qualification onDataChange={handleQualificationDataChange} />
          </Content>
        </ContentContainer>
        <ContentContainer>
          <Label>포트폴리오</Label>
          <Content>
          <Portfolio onDataChange={handlePortfolioDataChange} />
          </Content>
        </ContentContainer>
        <ContentContainer>
          <Label>자기소개</Label>
          <Content>
          <SelfIntroduction onDataChange={handleSelfIntroductionChange} />
          </Content>
        </ContentContainer>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <SignUpButton isActive={isValid} onClick={isValid ? handleSignUp : undefined}>
          회원가입
        </SignUpButton>
      </Container>
    </div>
  );
};

export default SignUp;
