import React, { useState, useEffect, useCallback } from "react";
import { formatPeriod, validatePeriodInput } from "./utils/func";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from '../asset/component/Header';
import ProjectMember from "./page/ProjectMember";
import SkillSearch from "./page/SkillSearch";
import Thumbnail from "./page/Thumbnail";
import ProjectImg from "./page/ProjectImg";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  background-color: #151515;
  color: white;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  font-family: 'SUIT', sans-serif;
`

const Arrow = styled.div`
  display: flex;
  position: absolute;
  left: 5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #E32929;
  font-size: clamp(3rem, 5vw, 5rem);
  cursor: pointer;
`;

const HeaderTitleContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: clamp(30px, 3.3vw, 44px);
  font-weight: 700;
  line-height: 66px;
  margin: 2rem 0;
`;

const HeaderTitle= styled.div`
  display : flex;
`

const HeaderContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  margin: clamp(3rem, 6vw, 6rem) 0;
  margin-top: clamp(1rem, 2vw, 2rem);
`
const ProjectTitle = styled.input`
  display :flex;
  font-size:clamp(60px, 5vw, 100px);
  margin-bottom: clamp(2rem, 3vw, 2rem);
  font-weight: bold;
  color: white;
  background-color: #151515;
  border: none;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #e0e0e0;
  }
`

const User = styled.div`
  display:flex;
  align-items: center;
`


const ProfileImage = styled.div<{ src: string }>`
  width: clamp(20px, 3vw, 40px);
  height: clamp(20px, 3vw, 40px);
  border-radius: 50%;
  background-color: white;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  margin-right: clamp(10px, 1vw, 1rem);
`

const UserName = styled.div`
  display: flex;
  margin-right: clamp(10px, 1vw, 1rem);
  font-size: clamp(18px, 1.5vw, 24px);
  font-family: 'SUIT', sans-serif;
  color: #BDBDBD;
`


const Date = styled.div`
  display: flex;
  font-size: clamp(10px, 1.5vw, 1.5rem);
  font-family: 'SUIT', sans-serif;
  color: #BDBDBD;
`

const ContentContainer = styled.div`
  display: flex;
  width: 80%;
  margin-bottom: clamp(5rem, 5vw, 10rem);
  
`

const MetadataContainer = styled.div`
  display: flex;
  width: clamp(300px, 25vw, 400px);
  margin-right: clamp(1rem, 2vw, 2rem);
  flex-direction: column;
  box-sizing: border-box;
`

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: clamp(10px, 2vw, 2rem);
`

const Input = styled.input`
  display: flex;
  flex: 1;
  padding: clamp(0.5rem, 1vw, 15px);
  font-size: clamp(10px, 1vw, 18px);
  padding-left: 0;
  background: #151515;
  color: white;
  border: none;
  border-bottom: 1px solid #616161;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #e0e0e0;
  }
`

const InputLink = styled.input`
  display: flex;
  width: 100%;
  background-color: #212121;
  color: #9e9e9e;
  font-size: clamp(10px, 1vw, 18px);
  padding: clamp(0.5rem, 1vw, 15px);
  border: none;
  box-sizing: border-box;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
    color: white;
  }
`

const Content = styled.div`
  margin-bottom: clamp(1rem, 2vw, 2rem);
`

const ProjectContainer = styled.div`
  display: flex;
  flex:1;
  flex-direction: column;
  box-sizing: border-box;
  gap: clamp(8px, 1vw, 1rem);
`

const Title = styled.div`
  display: flex;
  font-family: "SUIT";
  font-weight: 500;
  margin-bottom: clamp(5px, 0.5vw, 10px);
  font-size: clamp(1rem, 1vw, 20px);
`

const Option = styled.button<{ selected: boolean }>`
  all: unset;
  display: inline-block;
  padding: clamp(3px, 1vw, 6px) clamp(5px, 1vw, 8px);
  margin: clamp(5px, 1vw, 7px);
  margin-left: 0;
  font-size: clamp(0.5rem, 1vw, 1rem);
  background-color: ${(props) => (props.selected ? "red" : "#151515")};
  border: 1px solid ${(props) => (props.selected ? "red" : "white")};
  color: ${(props) => (props.selected ? "#151515" : "white")};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background: #777777;
  }
`

const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: clamp(1rem, 2vw, 2rem);
`

const TextArea = styled.textarea`
  width: 100%;
  height: clamp(13rem, 20vw, 24rem);
  background-color: #212121;
  color: white;
  border: none;
  padding: clamp(0.5rem, 1vw, 15px);
  font-size: clamp(10px, 1vw, 18px);
  resize: none;
  box-sizing: border-box;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
    border: 1px solid #757575;
    box-shadow: #212121;
  }
`

const CharacterCount = styled.div`
  position: absolute;
  bottom: clamp(5px, 1vw, 10px);
  right: 5px;
  color: #616161;
  font-size: 12px;
`

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  padding: 10px 20px;
  border: 1px solid #e32929;
  background-color: transparent;
  margin-bottom: 2rem;
  color: #e32929;
  font-family: 'SUIT', sans-serif;
  font-size: clamp(0.8rem, 1.5vw, 1.5rem);
  font-weight: 500;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #e32929;
    color: #151515;
  }
`

const ButtonText = styled.div`
  margin-right: 20px;
`

const ErrorMessage = styled.div`
  color: white;
  font-size: clamp(12px,1.5vw,24px);
  margin-bottom: 1rem;
`

const ArchiveRegistration = () => {
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState({
    title: "",
    period: "",
    field: "",
    description: "",
  });

  const [ProgressData, setProgressData] = useState({
    link:""
  });

  const [fields] = useState<string[]>([
    "대회",
    "창업",
    "대외활동", 
    "경험", 
    "스터디"
]);

  const [thumbnailImage, setThumbnailImage] = useState<string | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]); 
  const [users] = useState([
    { name: "홍길동", role: "PM", profile: "" },
    { name: "홍길동", role: "Front-end", profile: "" },
    { name: "정준용", role: "Back-end", profile: "" },
  ]);

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
  

  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<
    { id: number; name: string; role: string; profile: string }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const handleFieldClick = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((s) => s !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };


  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const validatedInput = validatePeriodInput(inputValue);
    const formattedValue = formatPeriod(validatedInput);

    setProjectData((prev) => ({ ...prev, period: formattedValue }));
  };

  useEffect(() => {
    setProjectData((prev) => ({
      ...prev,
      field: selectedFields.join(", "),
    }));
  }, [selectedFields]);


  const validateInputs = useCallback(() => {
    return "팀원들이 모두 평가를 진행해야 프로젝트가 등록됩니다.";
    if (!projectData.title.trim()) {
      return "프로젝트 제목을 입력해주세요.";
    }
    if (!projectData.period.trim()) {
      return "프로젝트 기간을 입력해주세요.";
    }
    if (selectedFields.length === 0) {
      return "분야를 선택해주세요.";
    }
    if (!projectData.description.trim()) {
      return "프로젝트 소개를 입력해주세요.";
    }
    if (selectedSkills.length === 0) {
      return "스킬을 선택해주세요.";
    }

  }, [
    projectData.title,
    projectData.period,
    projectData.description,
    selectedFields,
    selectedSkills,
  ]);

  useEffect(() => {
    const validationError = validateInputs();
    setErrorMessage(validationError);
  }, [validateInputs]);

  const handleRegisterClick = () => {
    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    console.log("프로젝트 데이터:", projectData);
    console.log("프로세스 데이터:", ProgressData);
    console.log("선택된 분야:", selectedFields);
    console.log("선택된 스킬:", selectedSkills);
    console.log("선택된 멤버: ", selectedMembers)
    console.log("썸네일 이미지:", thumbnailImage);
    console.log("프로젝트 이미지들:", projectImages);
  };

  return (
    <>
      <Header headerName="archive"/> 
    <Container>
      <HeaderTitleContainer>
        <Arrow>
          <AiOutlineArrowLeft style={{fontSize: "clamp(30px, 3vw, 50px"}}  onClick = {()=>navigate('/archive')}/>
        </Arrow>
        <HeaderTitle>아카이브 프로젝트 등록</HeaderTitle>
      </HeaderTitleContainer>
      <HeaderContainer>
        <ProjectTitle
        placeholder="프로젝트 제목을 입력해주세요!"
        value={projectData.title}
        onChange={(e) =>
          setProjectData((prev) => ({ ...prev, title: e.target.value }))
        }
        />
        <User>
          <ProfileImage src = ""/>
          <UserName>홍길동</UserName>
          <Date> 24.08.08</Date>
        </User>
      </HeaderContainer>
      <ContentContainer>
      <MetadataContainer>
        <Title>기간</Title>
        <InputContainer>
          <Input
            placeholder="2000.00.00 ~ 2000.00.00"
            value={projectData.period}
            onChange={handlePeriodChange}
          />
        </InputContainer>
        <Title>분야</Title>
        <Content>
          {fields.map((field) => (
            <Option
              key={field}
              selected={selectedFields.includes(field)}
              onClick={() => handleFieldClick(field)}
            >
              {field}
            </Option>
          ))}
        </Content>
        <Title>프로젝트 소개</Title>
        <TextAreaContainer>
          <TextArea
            value={projectData.description}
            onChange={(e) =>
              setProjectData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="프로젝트 소개를 300자 이내로 적어주세요!"
            maxLength={300}
          />
          <CharacterCount>
            {projectData.description.length}/300
          </CharacterCount>
        </TextAreaContainer>
        <Title>함께한 멤버</Title>
        <ProjectMember
         results={users} 
         onMemberSelect={setSelectedMembers}
         />
        <Title>사용 스킬</Title>
        <SkillSearch
            results={skills}
            onSkillSelect={setSelectedSkills}
        />
        <Title>링크</Title>
        <TextAreaContainer>
          <InputLink
            value={ProgressData.link}
            onChange={(e) =>
              setProgressData((prev) => ({
                ...prev,
                link: e.target.value,
              }))
            }
            placeholder="프로젝트가 올라간 페이지의 링크를 입력해 주세요!"
          />
        </TextAreaContainer>
      </MetadataContainer>
      <ProjectContainer>
        <Thumbnail onDataChange={({ imageUrl }) => setThumbnailImage(imageUrl)} />
        <ProjectImg
              onDataChange={({ imageUrls }) => setProjectImages(imageUrls)} 
            />
      </ProjectContainer>
      </ContentContainer>
      <ButtonContainer onClick={handleRegisterClick}>
        <ButtonText>등록하기</ButtonText>
        <AiOutlineArrowRight style={{ fontSize: "30px", strokeWidth: "0.5px" }} />
      </ButtonContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
    </>
  );
};

export default ArchiveRegistration;
