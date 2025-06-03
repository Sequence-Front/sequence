import React, { useState, useEffect, useCallback } from "react";
import { formatPeriod, validatePeriodInput } from "./utils/func";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ProjectMember from "./page/ProjectMember";
import SkillSearch from "./page/SkillSearch";
import Thumbnail from "./page/Thumbnail";
import ProjectImg from "./page/ProjectImg";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { postArchive, editArchive } from "../api/archive";
import { getArchiveDetail } from "../api/archivedetail";
import { duration } from "@mui/material";

const Container = styled.div`
  display: flex;
  background-color: #151515;
  color: white;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;

`

const FlexContainer = styled.div`
  display: flex;
  width: 70%;
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
  font-size: 4rem;
  cursor: pointer;
`;

const HeaderTitleContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 700;
  line-height: 66px;
  margin: 2rem 0;
  margin-top: 5rem;
`;

const HeaderTitle= styled.div`
  display : flex;
`

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: clamp(3rem, 6vw, 6rem) 0;
  margin-top: clamp(1rem, 2vw, 2rem);
`
const ProjectTitle = styled.input`
  display :flex;
  font-size: 3rem;
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
  font-size: 1rem;
  font-family: 'SUIT', sans-serif;
  color: #BDBDBD;
`


const Date = styled.div`
  display: flex;
  font-size: 1rem;
  font-family: 'SUIT', sans-serif;
  color: #BDBDBD;
`

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: clamp(5rem, 5vw, 10rem);
  
`

const MetadataContainer = styled.div`
  display: flex;
  width: 30%;
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
  font-size: 1rem;
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
  font-size: 1rem;
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
  margin-bottom: clamp(1rem, 4vw, 4rem);
`

const ProjectContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  box-sizing: border-box;
  gap: clamp(8px, 1vw, 1rem);
`

const Title = styled.div`
  display: flex;
  font-family: "SUIT";
  font-weight: 500;
  margin-bottom: clamp(5px, 0.5vw, 10px);
  font-size: 1.5rem;
`

const Option = styled.button<{ selected: boolean }>`
  all: unset;
  display: inline-block;
  padding: clamp(3px, 1vw, 6px) clamp(5px, 1vw, 8px);
  margin: clamp(5px, 1vw, 7px);
  margin-left: 0;
  font-size: 1rem;
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
  margin-bottom: 3rem;
`

const TextArea = styled.textarea`
  width: 100%;
  height: clamp(13rem, 20vw, 24rem);
  background-color: #212121;
  color: white;
  border: none;
  padding: clamp(0.5rem, 1vw, 15px);
  font-size: 1rem;
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
  font-size: 1rem;
`

export const ButtonContainer = styled.button`
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
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #e32929;
    color: #151515;
  }
`

export const ButtonText = styled.div`
  margin-right: 20px;
`

const ErrorMessage = styled.div`
  color: #e32929;
  font-size: 1rem;
  margin-bottom: 1rem;
`

const NoticeMessage = styled.div`
  color: #9e9e9e;
  font-size: 1rem;
  margin-bottom: 1rem;
  font-family: 'SUIT', sans-serif;
  text-align: center;
`

const ArchiveRegistration = () => {
  const navigate = useNavigate();
  const { archiveId } = useParams();
  const isEdit = !!archiveId;
  const [loginUser, ] = useState(localStorage.getItem('nickname'));
  const [date, setDate] = useState("");
    useEffect(() => {
      const today = new window.Date();
      const formattedDate = `${today.getFullYear() % 100}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;
      setDate(formattedDate);
    }, []);
  

  const [projectData, setProjectData] = useState({
    title: "",
    period: "",
    field: "",
    description: "",
  });

  const [link, setLink] = useState("");

  const [fields] = useState<string[]>([
    "대회",
    "창업",
    "대외활동", 
    "경험", 
    "스터디"
]);

  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [projectImages, setProjectImages] = useState<File[]>([]); 
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");  
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [deletedThumbnail, setDeletedThumbnail] = useState(false);
  const [deletedProjectImgs, setDeletedProjectImgs] = useState<string[]>([]);

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
      setSelectedFields([]);
    } else {
      setSelectedFields([field]);
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
    if (!projectData.title) return "프로젝트 제목을 입력해주세요.";
    if (!projectData.period) return "프로젝트 기간을 입력해주세요.";
    if (!projectData.description) return "프로젝트 소개를 입력해주세요.";
    if (selectedFields.length === 0) return "분야를 선택해주세요.";
    if (selectedSkills.length === 0) return "스킬을 한 개 이상 선택해주세요.";
    if (selectedMembers.length === 0) return "함께한 멤버를 한 명 이상 선택해주세요.";
    return ""; 
  }, [
    projectData.title,
    projectData.period,
    projectData.description,
    selectedFields,
    selectedSkills,
    selectedMembers,
  ]);
  

  useEffect(() => {
    const validationError = validateInputs();
    setErrorMessage(validationError);
    return;
  }, [validateInputs]);

  const formatDateForServer = (period: string) => {
    const dateParts = period.split("~").map(date => date.trim().replace(/\./g, "-"));
    return dateParts.length === 2 
        ? { startDate: dateParts[0], endDate: dateParts[1] } 
        : { startDate: "", endDate: "" };
  };

  const { startDate, endDate } = formatDateForServer(projectData.period);
  const formatDateToDot = (date: string) => date.replace(/-/g, ".");

  useEffect(() => {
    const fetchArchiveData = async () => {
      if (!isEdit) return;
  
      try {
        const res = await getArchiveDetail(archiveId);
        const data = res.data;
  
        setProjectData({
          title: data.title,
          period: `${formatDateToDot(data.startDate)} ~ ${formatDateToDot(data.endDate)}`,
          field: data.category,
          description: data.description,
        });
  
        setSelectedFields([data.category]);
        setSelectedSkills(data.skills);
        setLink(data.link);
  
        setSelectedMembers(data.members.map((m: any, idx: number) => ({
          id: idx,
          name: m.nickname,
          role: "", 
          profile: m.profileImg,
        })));
        
  
        setThumbnailUrl(data.thumbnail); 
        setImageUrls(data.imgUrls);   
  
      } catch (error) {
        console.error("아카이브 상세 불러오기 실패:", error);
      }
    };
  
    fetchArchiveData();
  }, [isEdit, archiveId]);

  const handleRegisterClick = async() => {
    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
    }

    const archiveData: any = {
      title: projectData.title,
      description : projectData.description,
      startDate: startDate,
      endDate: endDate,
      category : selectedFields[0],
      link: link,
      skills: selectedSkills,
      archiveMembers: selectedMembers.map(member => ({ nickname: member.name }))
    }

    if (isEdit) {
      archiveData.thumbnail = deletedThumbnail ? "" : thumbnailUrl;
      archiveData.imgUrls = imageUrls.filter((url) => !deletedProjectImgs.includes(url));
    }

    try {
      let response;
      if (isEdit) {
        response = await editArchive(
          archiveData,
          projectImages,
          thumbnailImage,
          archiveId
        );
      } else {
        response = await postArchive(archiveData, projectImages, thumbnailImage);
      }
  
      if (response.data) {
        navigate(isEdit ? `/archive/${archiveId}` : `/${response.data.data}/teamevaluation`);
      }
    } catch (err) {
      console.error("아카이브 등록/수정 에러:", err);
      setErrorMessage("오류 발생");
    }
  }; 

  return (
    <>
    <Container>
      <HeaderTitleContainer>
        <Arrow>
          <AiOutlineArrowLeft style={{fontSize: "clamp(30px, 3vw, 50px"}}  onClick = {()=>navigate('/archive')}/>
        </Arrow>
        <HeaderTitle>아카이브 프로젝트 등록</HeaderTitle>
      </HeaderTitleContainer>
      <FlexContainer>
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
          <UserName>{loginUser}</UserName>
          <Date> {date}</Date>
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
         onMemberSelect={setSelectedMembers}
         isEdit={isEdit}
         />
        <Title>사용 스킬</Title>
        <SkillSearch
            results={skills}
            onSkillSelect={setSelectedSkills}
            defaultSkills={selectedSkills}
        />
        <Title>링크</Title>
        <TextAreaContainer>
          <InputLink
            value={link}
            onChange={(e) => setLink(e.target.value) }
            placeholder="프로젝트가 올라간 페이지의 링크를 입력해 주세요!"
          />
        </TextAreaContainer>
      </MetadataContainer>
      <ProjectContainer>
      <Thumbnail
        onDataChange={({ imageFile, deletedDefault }) => {
        setThumbnailImage(imageFile);
        if (deletedDefault !== undefined) setDeletedThumbnail(deletedDefault);
        }}
        defaultUrl={thumbnailUrl}
      />

      <ProjectImg
        onDataChange={({ imageFiles, deletedDefaultUrls }) => {
        setProjectImages(imageFiles);
        if (deletedDefaultUrls) setDeletedProjectImgs(deletedDefaultUrls);
        }}
        defaultUrls={imageUrls}
      />

      </ProjectContainer>
      </ContentContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ButtonContainer onClick={handleRegisterClick} disabled={!!validateInputs()}>
        <ButtonText>{isEdit ? "수정하기" : "팀원평가 하러가기"}</ButtonText>
        <AiOutlineArrowRight style={{ fontSize: "30px", strokeWidth: "0.5px" }} />
      </ButtonContainer>
      <NoticeMessage>팀원들이 모두 평가를 진행해야 프로젝트가 등록됩니다.</NoticeMessage>
      </FlexContainer>
    </Container>
    </>
  );
};

export default ArchiveRegistration;
