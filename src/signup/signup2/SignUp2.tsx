//2024-11-28 02:20 정준용완성
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Header from '../../asset/component/Header';
import Profile from "./page/Profile";
import Education from "./page/Education";
import Activity from "./page/Activity";
import PersonalHistory from "./page/PersonalHistory";
import Qualification from "./page/Qualification";
import Portfolio from "./page/Portfolio";
import SelfIntroduction from "./page/SelfIntroduction";
import { PageNumber } from '../signup1/SignUp1';
import { Title as STitle } from '../signup1/style/SignUpPageStyle';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from 'react-router-dom';
import { signUpApi } from '../../api/SignUpAPI';


const Container = styled.div`
  display: flex;
  width: 70%;
  margin: 0px auto;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  min-width: 680px;
`

const TitleContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 1rem; 
  
 `

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin-bottom: clamp(2rem, 4vw, 5rem);
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
  @media (max-width: 960px) {
    width:25%;
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

const TagNumber = styled.span`
  position: absolute;
  top: -8px;
  left: -8px;
  width: 20px;
  height: 20px;
  background: white;
  color: black;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: clamp(0.8rem, 1.5vw, 1.2rem);
  text-align: center;
  margin-bottom: 20px;
`

const SignUp2: React.FC<{ userData: any; onNext: () => void }> = ({ userData, onNext }) => {

  const location = useLocation();

  useEffect(() => {
    console.log("1단계데이터:", userData);
  }, [userData]);

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

  const [profileData, setProfileData] = useState<{ nickname: string; imageFile: File | null; duplicateCheck: boolean }>({
    nickname: "",
    duplicateCheck: false,
    imageFile: null,
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
    experienceType: string;
    experienceName: string;
    startDate: [string, string, string];
    endDate: [string, string, string];
    experienceDescription: string;
    }[]
  >([]);

  const [personalHistoryData, setPersonalHistoryData] =  useState<
  {
    companyName: string;
    startDate: [string, string, string];
    endDate: [string, string, string];
    careerDescription: string;
  }[]
  >([]);

  const [qualificationData, setQualificationData] = useState<
  {
    awardType: string;
    organizer: string;
    awardDuration: [string, string, string];
    awardName: string;
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
    setSelectedRoles((prevRoles) => {
      if (prevRoles.includes(role)) {
        return prevRoles.filter((r) => r !== role);
      }
      return [...prevRoles, role];
    });
  };

  const handleProfileDataChange = (data: { nickname: string; imageFile: File | null; duplicateCheck: boolean }) => {
    setProfileData(data);
  };

  const handleActivityDataChange = (
    data: {
      experienceType: string;
      experienceName: string;
      startDate: [string, string, string];
      endDate: [string, string, string];
      experienceDescription: string;
    }[]
  ) => {
    setActivityData(data);
  };

  const handlePersonalHistoryDataChange = (
    data: {
      companyName: string;
      startDate: [string, string, string];
      endDate: [string, string, string];
      careerDescription: string;
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
      awardType: string;
      awardName: string;
      awardDuration: [string, string, string];
      organizer: string;
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

  // 유효성 검사
  const validateInputs = useCallback(() => {
    if (profileData.nickname.trim() === "") {
      return "별명을 입력해주세요.";
    }
    if (!profileData.duplicateCheck) {
      return "별명 중복확인이 필요합니다.";
    }
    if (profileData.imageFile === null) {
      return "프로필 사진을 업로드해주세요.";
    }
    if (educationData.schoolName.trim() === "") {
      return "학교명을 입력해주세요.";
    }
    if (educationData.year.trim() ===""){
      return "학년을 입력해주세요."
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
          activity.experienceType.trim() !== "유형 선택" ||
          activity.experienceName.trim() !== "" ||
          activity.startDate.some((date) => date.trim() !== "") ||
          activity.endDate.some((date) => date.trim() !== "") ||
          activity.experienceDescription.trim() !== "";
  
        if (isPartiallyFilled) {
          if (activity.experienceType.trim() === "유형 선택") {
            return "경험 및 활동이력의 유형을 선택해주세요.";
          }
          if (activity.experienceName.trim() === "") {
            return "경험 및 활동이력의 제목을 적어주세요.";
          }
          if (
            activity.startDate.some((date) => date.trim() === "") ||
            activity.endDate.some((date) => date.trim() === "")
          ) {
            return "경험 및 활동이력의 활동 기간을 적어주세요.";
          }
          if (activity.experienceDescription.trim() === "") {
            return "경험 및 활동이력의 경험 내용을 적어주세요.";
          }
        }
      }
    }
  
    if (personalHistoryData.length > 0) {
      for (const personalHistory of personalHistoryData) {
        const isPartiallyFilled =
          personalHistory.companyName.trim() !== "" ||
          personalHistory.startDate.some((date) => date.trim() !== "") ||
          personalHistory.endDate.some((date) => date.trim() !== "") ||
          personalHistory.careerDescription.trim() !== "";
  
        if (isPartiallyFilled) {
          if (personalHistory.companyName.trim() === "") {
            return "경력의 회사명을 적어주세요.";
          }
          if (
            personalHistory.startDate.some((date) => date.trim() === "") ||
            personalHistory.endDate.some((date) => date.trim() === "")
          ) {
            return "경력의 활동 기간을 적어주세요.";
          }
          if (personalHistory.careerDescription.trim() === "") {
            return "경력의 근무 내용을 적어주세요.";
          }
        }
      }
    }
  
    if (qualificationData.length > 0) {
      for (const qualification of qualificationData) {
        const isPartiallyFilled =
          qualification.awardType.trim() !== "유형 선택" ||
          qualification.organizer.trim() !== "" ||
          qualification.awardDuration.some((date) => date.trim() !== "") ||
          qualification.awardName.trim() !== "";
  
        if (isPartiallyFilled) {
          if (qualification.awardType.trim() === "유형 선택") {
            return "자격 및 수상의 유형을 선택해주세요.";
          }
          if (qualification.organizer.trim() === "") {
            return "자격 및 수상의 이름을 적어주세요.";
          }
          if (qualification.awardDuration.some((date) => date.trim() === "")) {
            return "자격 및 수상의 취득 날짜를 적어주세요.";
          }
          if (qualification.awardName.trim() === "") {
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
  

  const handleSignUp = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
  
    const formattedSkills = selectedSkills.map(skill =>
      skill.toUpperCase().replace(/[\s/-]/g, "_")
    );
  
    const formattedRoles = selectedRoles.map(role =>
      role.toUpperCase().replace(/[\s/-]/g, "_")
    );
  
    // 날짜 변환 함수 (00 → 2000 변환)
    const formatDate = (dateArray: [string, string, string]) => {
      if (!dateArray || dateArray.length !== 3 || dateArray.every(date => date.trim() === "")) {
        return null;
      }
    
      let year = dateArray[0].trim();
      const month = dateArray[1].trim().padStart(2, "0");
      const day = dateArray[2].trim().padStart(2, "0");
    
      if (year.length === 2) {
        year = `20${year}`;
      }
    
      if (!year || !month || !day) return null;
    
      return `${year}-${month}-${day}`;
    };
    
      
  const convertActivity = (type: string) => {
    switch (type) {
      case "대외활동":
        return "EXTERNAL_ACTIVITY";
      case "교육":
        return "EDUCATION";
      case "봉사":
        return "VOLUNTEER";
      case "동아리":
        return "CLUB";
      case "기타":
        return "ETC";
      default:
        return type; 
    }
  };

    const filteredExperience = activityData
    .filter(activity => activity.experienceType.trim() !== "유형 선택")
    .map(activity => ({
      ...activity,
      startDate: formatDate(activity.startDate),
      endDate: formatDate(activity.endDate),
      experienceType: convertActivity(activity.experienceType)
    }));
  
    const filteredCareers = personalHistoryData
    .filter(career => career.companyName.trim() !== "")
    .map(career => ({
      ...career,
      startDate: formatDate(career.startDate), 
      endDate: formatDate(career.endDate),
    }));
  
    const convertAwardType = (type: string) => {
      switch (type) {
        case "자격증":
          return "CERTIFICATE";
        case "수상":
          return "AWARD";
        default:
          return type; 
      }
    };
    
    const filteredAwards = qualificationData
    .filter(award => award.awardType.trim() !== "유형 선택")
    .map(award => ({
      ...award,
      awardType: convertAwardType(award.awardType),
      awardDuration: formatDate(award.awardDuration),
    }));
    //--------------------------//
  
    const fullUserData = {
      username: userData.username,
      password: userData.password,
      name: userData.name,
      nickname: profileData.nickname,
      birth: userData.birthDate,
      gender: userData.gender,
      address: userData.address,
      phone: userData.phone,
      email: userData.email,
      introduction: selfIntroduction,
      portfolio: portfolioData,
      schoolName: educationData.schoolName,
      major: educationData.major,
      grade: educationData.year,
      entranceDate: educationData.startYear,
      graduationDate: educationData.endYear,
      degree: educationData.status,
      skillCategory: formattedSkills,
      desiredJob: formattedRoles,
      experiences: filteredExperience,
      careers: filteredCareers,
      awards: filteredAwards,
    };
    const authImgFile = profileData.imageFile;
  
    try {
      const response = await signUpApi(fullUserData, authImgFile);
      console.log(response);
      if (!response) {
        setErrorMessage("서버 응답이 없습니다. 다시 시도해주세요.");
        return;
      }
      if (response.status === 200) {
        console.log("회원가입 성공:", response.data);
        onNext();
      }
    } catch (error: any) {
      console.log(error.response);
      if (error.response && error.response.status === 400) {
        setErrorMessage("입력한 값이 올바르지 않습니다. 다시 확인해주세요.");
      } else {
        setErrorMessage("서버와의 연결이 원활하지 않습니다. 다시 시도해주세요.");
      }
    }
  };
  
  const isValid =
    profileData.nickname.trim() !== "" &&
    profileData.imageFile !== null &&
    educationData.schoolName.trim() !== "" &&
    educationData.major.trim() !== "" &&
    selectedSkills.length > 0 &&
    selectedRoles.length > 0;

  const  navigate = useNavigate();
  return (
    <div style={{ display:"flex",flexDirection:"column", backgroundColor: "#151515", minWidth: "680px" }}>
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
            프로필<span>*</span>
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
            <Description>복수 선택(우선 순위 반영)</Description>
          </Label>
          <Content>
            {roles.map((role) => {
              const selectedIndex = selectedRoles.indexOf(role);
              const isSelected = selectedIndex !== -1;
              return (
                <Tag key={role} selected={isSelected} onClick={() => handleRoleClick(role)} style={{position: 'relative'}}>
                  {isSelected && <TagNumber>{selectedIndex + 1}</TagNumber>}
                  {role}
                </Tag>
              );
            })}
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

export default SignUp2;
