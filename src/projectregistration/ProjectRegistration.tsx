// 2024-1208- 14:56 정준용 완성
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { formatPeriod, validatePeriodInput } from "./utils/func";
import ProjectMember from "./page/ProjectMember";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { postProject, editProject } from "../api/project";
import { getProjectDetail } from "../api/projectdetail";
import Header from "../asset/component/Header";
import { memberSearch } from "../api/member";

const Container = styled.div`
  display: flex;
  background-color: #151515;
  color: white;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
`

const HeaderContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;

  margin: clamp(4rem, 8vw, 8rem) 0;
`
const ProjectTitle = styled.input`
  display :flex;
  font-size:clamp(1.9rem, 3.8vw, 3.8rem);
  color: white;
  margin-bottom: clamp(2rem, 3vw, 3.5rem);
  font-weight: bold;
  background-color: #151515;
  border: none;

  &::placeholder{
    color : #757575;
  }

  &:focus{
    outline: none;
    border: none;
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
  font-size: clamp(10px, 1.5vw, 1.5rem);
  font-family: 'SUIT', sans-serif;
  color: #BDBDBD;
`


const Date = styled.div`
  display: flex;
  font-size: clamp(10px, 1.5vw, 1.5rem);
  font-family: 'SUIT', sans-serif;
  color: #BDBDBD;
`

const InfoContainer = styled.div`
  display:flex;
  width: 20%;
  margin-right: clamp(1rem, 2vw, 2rem);
  flex-direction: column;
  box-sizing: border-box;
`

const Tag = styled.div`
  display: flex;
  color : #E32929;
  margin-bottom: clamp(1rem, 1.5vw, 1.5rem);
  font-size:clamp(0.8rem, 1.5vw, 1.5rem);
  font-family: 'SUIT', sans-serif;
  font-weight: 700;
`

const Info = styled.div`
  display: flex;
  font-size: clamp(0.8rem, 1.5vw, 1.5rem);
  color: white;
    font-family: 'SUIT', sans-serif;
    font-weight: 600;
`

const ContentContainer = styled.div`
  display: flex;
  width: 80%;
  margin-bottom: clamp(5rem,5vw,10rem);
  
`

const MetadataContainer = styled.div`
  display: flex;
  width: 30%;
  margin-right: clamp(2rem, 3vw, 3rem);
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
  font-size: clamp(10px, 1vw, 1.3rem);
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
  font-size: clamp(10px, 1.2vw, 1.3rem);
  padding: clamp(0.5rem, 1vw, 15px);
  border: none;
  font-size: clamp(10px, 1.2vw, 1.3rem);
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
  flex: 1;
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
  font-size: clamp(1rem, 1.5vw, 1.5rem);
`

const Option = styled.button<{ selected: boolean }>`
  all: unset;
  display: inline-block;
  padding: clamp(5px, 1vw, 8px) clamp(6px, 1vw, 10px);
  margin: clamp(5px, 1vw, 7px);
  margin-left: 0;
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

const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
`

const TextArea = styled.textarea`
  width: 100%;
  height: clamp(13rem, 26vw, 26rem);
  background-color: #212121;
  color: white;
  border: none;
  padding: clamp(0.5rem, 1vw, 15px);
  font-size: clamp(10px, 1.2vw, 1.3rem);
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
  margin-bottom: 3rem;
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
  color: red;
  font-size: 1rem;
  margin-bottom: 1rem;
`

const ProjectRegistration = () => {
  const { projectId } = useParams();
  const isEdit = !!projectId;
  const [postTitle, setPostTitle] = useState("");
  const [projectData, setProjectData] = useState({
    title: "",
    period: "",
    field: "",
    description: "",
  });

  const [recruitmentData, setRecruitmentData] = useState({
    person: "",
    role: "",
    skill: "",
    recruitmentComment: "",
  });

  const [ProgressData, setProgressData] = useState({
    link:""
  });

  const [profile, ] = useState(localStorage.getItem('profile')|| "/default-profile.png");
  const [nickname, ] = useState(localStorage.getItem('nickname'));

  const [fields] = useState<string[]>([
    "대회",
    "창업",
    "대외활동", 
    "경험", 
    "스터디"
]);
  const [roles] = useState<string[]>([
    "UX/UI Design",
    "BX Design",
    "Front-end",
    "Back-end",
    "PM",
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
  
  const [meetings] = useState<string[]>([
    "오프라인",
    "온라인",
    "병행",
  ]);

  const [steps] = useState<string[]>([
    "시작 전",
    "기획 중",
    "디자인 중",
    "개발 중",
    "창업 중",
  ]);

  const convertStepType = (type: string) =>{
    switch(type){
      case "시작 전":
        return "BEFORE_START";
      case "기획 중":
        return "PLANNING";
      case "디자인 중":
        return "DESIGNING";
      case "개발 중":
        return "DEVELOPING";
      case "창업 중":
        return "IN_BUSINESS";
      default:
        return type;
    }
  };

  const reverseStepType = (type: string) => {
    switch (type) {
      case "BEFORE_START":
        return "시작 전";
      case "PLANNING":
        return "기획 중";
      case "DESIGNING":
        return "디자인 중";
      case "DEVELOPING":
        return "개발 중";
      case "IN_BUSINESS":
        return "창업 중";
      default:
        return type;
    }
  };

  const navigate = useNavigate();

  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedMeetings, setSelectedMeetings] = useState<string[]>([]);
  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<
    { id: number; name: string; role: string; profile: string }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const handlePostTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  }
  const handleFieldClick = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields([]);
    } else {
      setSelectedFields([field]);
    }
  };

  const handleRoleClick = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((s) => s !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleSkillClick = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleMeetingClick = (meeting: string) => {
    if (selectedMeetings.includes(meeting)) {
      setSelectedMeetings([]);
    } else {
      setSelectedMeetings([meeting]);
    }
  };

  const handleStepClick = (step: string) => {
    if (selectedSteps.includes(step)) {
      setSelectedSteps([]);
    } else {
      setSelectedSteps([step]);
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
    if(!postTitle.trim()){
      return "게시글 제목을 입력해주세요."
    }
    if (!projectData.title.trim()) {
      return "프로젝트 제목을 입력해주세요.";
    }
    if (!projectData.period.trim()) {
      return "프로젝트 기간을 입력해주세요.";
    }
    if (selectedFields.length === 0) {
      return "분야를 선택해주세요.";
    }
    if (!recruitmentData.person.trim()) {
      return "모집 인원을 입력해주세요.";
    }
    if (selectedRoles.length === 0) {
      return "역할을 선택해주세요.";
    }
    if (selectedSkills.length === 0) {
      return "스킬을 선택해주세요.";
    }
    if(selectedMeetings.length===0){
      return "회의를 선택해 주세요."
    }
    if(selectedSteps.length===0){
      return "프로젝트 단계를 선택해 주세요."
    }
    if(projectData.description.length === 0 ){
      return "프로젝트 소개를 입력해주세요."
    }
    if(recruitmentData.recruitmentComment.length ===0){
      return "모집 칸을 입력해주세요."
    }
    return "";
  }, [
    postTitle,
    projectData.title,
    projectData.period,
    projectData.description,
    recruitmentData.person,
    recruitmentData.recruitmentComment,
    selectedFields,
    selectedRoles,
    selectedSkills,
    selectedMeetings,
    selectedSteps,
  ]);

  useEffect(() => {
    const validationError = validateInputs();
    setErrorMessage(validationError);
  }, [validateInputs]);

  const handleRegisterClick = async() => {
    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const project = {
      title: postTitle, 
      projectName: projectData.title, 
      startDate: projectData.period.slice(0, 7),
      endDate: projectData.period.slice(-7),
      category: projectData.field,
      introduce: projectData.description,
      personnel : recruitmentData.person,
      roles: selectedRoles,
      skills: selectedSkills,
      meetingOption: selectedMeetings[0],
      step: selectedSteps.length > 0 ? convertStepType(selectedSteps[0]) : "",
      invitedMembersNicknames: selectedMembers.map(member => member.name),
      article: recruitmentData.recruitmentComment,
      link : ProgressData.link
    };

    console.log(projectData.period);

    try {
      if (isEdit) {
        await editProject(project, projectId);
      } else {
        await postProject(project); 
      }
      navigate('/project');
    } catch (error) {
      console.log("전송된 프로젝트 데이터:", project);
      console.error("프로젝트 등록 에러:", error);
      setErrorMessage("프로젝트 등록 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {

    const checkPermission = async () => {
      if (!isEdit) return;

      try {
        const res = await getProjectDetail(projectId);
        const data = res.data;
        
        const myNickname = localStorage.getItem('nickname');
        if (data.writer !== myNickname) {
          alert("수정 권한이 없습니다.");
          navigate("/project");
          return;
        }

        setPostTitle(data.title);
        setProjectData({
          title: data.projectName,
          period: data.startDate + ' ~ ' +data.endDate, 
          field: data.category,
          description: data.introduce,
        });
        setRecruitmentData({
          person: data.personnel.toString(),
          role: "",
          skill: "",
          recruitmentComment: data.article,
        });
        setProgressData({ link: data.link });

        setSelectedFields([data.category]);
        setSelectedRoles(data.roles);
        setSelectedSkills(data.skills);
        setSelectedMeetings([data.meetingOption]);
        setSelectedSteps([reverseStepType(data.step)]);
        setSelectedMembers([]); 
        autoRegisterMembers(data.members.map((m: any) => m.nickname)); 
  
      } catch (err) {
        console.error("기존 프로젝트 불러오기 실패:", err);
      }
    };

    checkPermission();
  }, [isEdit, projectId]);

  const [date, setDate] = useState("");
  
  useEffect(() => {
    const today = new window.Date();
    const formattedDate = `${today.getFullYear() % 100}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;
    setDate(formattedDate);
  }, []);

  const autoRegisterMembers = async (nicknames: string[]) => {
    const promises = nicknames.map(async (nickname, i) => {
      try {
        const res = await memberSearch(nickname);
        const matched = res.message?.data?.find((name: string) => name === nickname);
  
        if (matched) {
          return {
            id: i,
            name: matched,
            role: "", 
            profile: "",     
          };
        }
  
        return null;
      } catch (err) {
        console.error(`멤버 ${nickname} 자동 등록 실패`, err);
        return null;
      }
    });
  
    const resolved = await Promise.all(promises);
    const filtered = resolved.filter((item) => item !== null) as {
      id: number;
      name: string;
      role: string;
      profile: string;
    }[];
  
    setSelectedMembers(filtered);
  };

  return (
  <>
  <Header headerName="Project"/>
    <Container>
      <HeaderContainer>
        <ProjectTitle 
         placeholder="게시글 제목을 입력해주세요!"
         value = {postTitle}
         onChange={handlePostTitle}
        />
        <User>
          <ProfileImage src={profile}/>
          <UserName>{nickname}</UserName>
          <Date> {date}</Date>
        </User>
      </HeaderContainer>
      <ContentContainer>
      <InfoContainer>
        <Tag>Project</Tag>
        <Info>어떤 프로젝트인가요?</Info>
      </InfoContainer>
      <MetadataContainer>
        <Title>제목</Title>
        <InputContainer>
          <Input
            placeholder="프로젝트 제목을 입력해주세요"
            value={projectData.title}
            onChange={(e) =>
              setProjectData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </InputContainer>
        <Title>기간</Title>
        <InputContainer>
          <Input
            placeholder="0000-00 ~ 0000-00"
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
      </MetadataContainer>
      <ProjectContainer>
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
            placeholder="프로젝트 소개를 450자 이내로 적어주세요!"
            maxLength={450}
          />
          <CharacterCount>
            {projectData.description.length}/450
          </CharacterCount>
        </TextAreaContainer>
      </ProjectContainer>
      </ContentContainer>


      <ContentContainer>
      <InfoContainer>
        <Tag>Recruitment</Tag>
        <Info>어떤 사람을 모집하나요?</Info>
      </InfoContainer>
      <MetadataContainer>
        <Title>인원</Title>
        <InputContainer>
          <Input
            placeholder="모집하는 인원 숫자를 입력해주세요"
            value={recruitmentData.person}
            onChange={(e) =>
              setRecruitmentData((prev) => ({ ...prev, person: e.target.value.replace(/[^0-9]/g, ""), }))
            }
          />
        </InputContainer>
        <Title>역할</Title>
        <Content>
          {roles.map((role) => (
            <Option
              key={role}
              selected={selectedRoles.includes(role)}
              onClick={() => handleRoleClick(role)}
            >
              {role}
            </Option>
          ))}
        </Content>
        <Title>필요 스킬</Title>
        <Content>
          {skills.map((skill) => (
            <Option
              key={skill}
              selected={selectedSkills.includes(skill)}
              onClick={() => handleSkillClick(skill)}
            >
              {skill}
            </Option>
          ))}
        </Content>
      </MetadataContainer>
      <ProjectContainer>
        <Title>모집</Title>
        <TextAreaContainer>
          <TextArea
            value={recruitmentData.recruitmentComment}
            onChange={(e) =>
              setRecruitmentData((prev) => ({
                ...prev,
                recruitmentComment: e.target.value,
              }))
            }
            placeholder="모집 인원에 대한 글을 450자 이내로 적어주세요!"
            maxLength={450}
          />
          <CharacterCount>
            {recruitmentData.recruitmentComment.length}/450
          </CharacterCount>
        </TextAreaContainer>
      </ProjectContainer>
      </ContentContainer>

      <ContentContainer>
      <InfoContainer>
        <Tag>Progress</Tag>
        <Info>진행방식은 어떤가요?</Info>
      </InfoContainer>
      <MetadataContainer>
        <Title>회의</Title>
        <Content>
          {meetings.map((meeting) => (
            <Option
              key={meeting}
              selected={selectedMeetings.includes(meeting)}
              onClick={() => handleMeetingClick(meeting)}
            >
              {meeting}
            </Option>
          ))}
        </Content>
        <Title>프로젝트 단계</Title>
        <Content>
          {steps.map((step) => (
            <Option
              key={step}
              selected={selectedSteps.includes(step)}
              onClick={() => handleStepClick(step)}
            >
              {step}
            </Option>
          ))}
        </Content>
      </MetadataContainer>
      <ProjectContainer>
        <Title>링크 및 첨부</Title>
        <TextAreaContainer>
          <InputLink
            value={ProgressData.link}
            onChange={(e) =>
              setProgressData((prev) => ({
                ...prev,
                link: e.target.value,
              }))
            }
            placeholder="URL을 입력해 주세요"
          />
        </TextAreaContainer>
      </ProjectContainer>
      </ContentContainer>
 

      <ContentContainer>
      <InfoContainer>
        <Tag>Member</Tag>
        <Info>함께한 멤버들은 누구인가요?</Info>
      </InfoContainer>
      <div style= {{display: 'flex', flex:'1'}}>
      <ProjectMember
  onMemberSelect={setSelectedMembers}
  defaultMembers={selectedMembers}
/>
      </div>
      </ContentContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ButtonContainer onClick={handleRegisterClick}>
        <ButtonText> {isEdit? "수정하기" : "등록하기"}</ButtonText>
        <AiOutlineArrowRight style={{ fontSize: "30px", strokeWidth: "0.5px" }} />
      </ButtonContainer>
    </Container>
    </>
  );
};

export default ProjectRegistration;
