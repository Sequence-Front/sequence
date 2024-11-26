import React, { useState } from "react";
import styled from "styled-components";
import Profile from "./page/Profile";
import Education from "./page/Education";
import Activity from "./page/Activity";
import PersonalHistory from "./page/PersonalHistory";
import Qualification from "./page/Qualification";
import Portfolio from "./page/Portfolio";
import SelfIntroduction from "./page/SelfIntroduction";

const Container = styled.div`
  display: flex;
  width: 80%;
  margin: 0px auto;
  color: white;
  padding: 20px;
  flex-direction: column;
`

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 3rem;
`

const Label = styled.div`
  display: flex;
  width: 200px;
  font-size: 1rem;
  font-weight: bold;

  span {
    align-self: center;
    margin-left: 5px;
    color: red;
  }
`

const Content = styled.div`
  flex: 1;
`

const SignUpButton = styled.button<{ isActive: boolean }>`
  display: flex;
  width: 20rem;
  justify-content: center;
  align-self: center;
  background-color: ${(props) => (props.isActive ? "red" : "#212121")};
  font-size: 1rem;
  color: ${(props) => (props.isActive ? "white" : "#616161")};
  padding: 10px 20px;
  border: none;
  cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${(props) => (props.isActive ? "#ff5555" : "#212121")};
  }
`

const Tag = styled.button<{ selected: boolean }>`
  all: unset;
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  background-color: ${(props) => (props.selected ? "red" : "#121212")};
  border: 1px solid ${(props) => (props.selected ? "red" : "white")};
  color: ${(props) => (props.selected ? "#121212" : "white")};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background: #777777;
  }
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

  const [profileData, setProfileData] = useState<{ nickname: string; imageUrl: string | null }>({
    nickname: "",
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

  const handleProfileDataChange = (data: { nickname: string; imageUrl: string | null }) => {
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

  const handleSignUp = () => {
    console.log("프로필:", profileData);
    console.log("학력:", educationData);
    console.log("스킬:", selectedSkills);
    console.log("역할:", selectedRoles);
    console.log("경험 및 활동 이력:", activityData);
    console.log("경력:", personalHistoryData);
    console.log("자격 및 수상:", qualificationData);
    console.log("포트폴리오", portfolioData);
    console.log("자기소개", selfIntroduction);
  };

  const isValid =
    profileData.nickname.trim() !== "" &&
    profileData.imageUrl !== null &&
    educationData.schoolName.trim() !== "" &&
    educationData.major.trim() !== "" &&
    selectedSkills.length > 0 &&
    selectedRoles.length > 0;

  return (
    <div style={{ backgroundColor: "#121212" }}>
      <Container>
        <ContentContainer>
          <Label>
            프로필 사진<span>*</span>
          </Label>
          <Content>
            <Profile onDataChange={handleProfileDataChange} />
          </Content>
        </ContentContainer>
        <ContentContainer>
          <Label>
            학력<span>*</span>
          </Label>
          <Content>
            <Education onDataChange={handleEducationDataChange} />
          </Content>
        </ContentContainer>
        <ContentContainer>
          <Label>
            스킬<span>*</span>
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
            희망 역할<span>*</span>
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
        <SignUpButton isActive={isValid} onClick={isValid ? handleSignUp : undefined}>
          회원가입
        </SignUpButton>
      </Container>
    </div>
  );
};

export default SignUp;
