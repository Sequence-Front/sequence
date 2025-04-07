import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../asset/component/Header';
import { LuPen } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { PiSirenLight } from "react-icons/pi";
import ProjectSection from './components/ProjectSection';
import RecruitmentSection from './components/RecruitmentSection';
import ProgressSection from './components/ProgressSection';
import ProfileSection from './components/ProfileSection';
import CommentSection from './components/CommentSection';
import { getProjectDetail } from '../api/projectdetail';


const Wrapper = styled.div`
`

const Container = styled.div`
  background-color: #151515;
  color: white;
  width: 75%;
  margin: 0 auto;
`;



const TitleSection = styled.div`
  margin: 4rem auto;
  width: 75%;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: clamp(2.5rem, 5vw, 5rem);
`

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: clamp(1.2rem, 1.5vw, 1.5rem);
  color: #BDBDBD;
  margin-top: 2rem;
`

const DetailBox =styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const TempImage = styled.div`
  background-color: grey;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`

const IconContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin-bottom: 3rem;
`

interface ProjectDetail {
  id: number;
  views: number;
  title: string;
  writer: string;
  createdDate: string;
  projectName: string;
  period: string;
  category: string;
  personnel: number;
  roles: string[];
  skills: string[];
  meetingOption: string;
  step: string;
  introduce: string;
  article: string;
  link: string;
  members: Array<{
    profileImgUrl: string | null;
    nickname: string;
  }>;
  comments: Array<{
    parentComment: {
      id: number;
      writer: string;
      content: string;
      createdLocalDateTime: string;
    };
    childComments: Array<{
      id: number;
      writer: string;
      content: string;
      createdLocalDateTime: string;
    }>;
  }>;
}

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState<ProjectDetail | null>(null);
  const navigate = useNavigate();

  const fetchProjectDetail = async () => {
    try {
      const response = await getProjectDetail(id);
      setProjectData(response.data);
    } catch (error) {
      console.error('프로젝트 상세 정보 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  if (!projectData) return <div>로딩 중...</div>;

  const writeClick = ()=>{
    const myNickname = localStorage.getItem("nickname");
    if(myNickname !== projectData?.writer){
      alert("수정 권한이 없습니다.");
      return;
    }
    navigate(`/project/edit/${id}`);
  }

  return (
    <Wrapper>
      <Header headerName="" isMain={false}/>
      <TitleSection>
        <IconContainer>
          <FaRegBookmark size={30} style={{color: "#E32929"}}/>
            <PiSirenLight
              size={30}
              title="신고"
              style={{ color: "#E32929", cursor: "pointer" }}
              onClick={() =>
              navigate(`/report`, {
              state: {
              targetType: 'project',
              targetId: id
              }})}
            />
          <LuPen onClick={writeClick} size={30} style={{color: "#E32929", cursor:"pointer"} } title="수정하기"/>
        </IconContainer>
        <Title>
          {projectData.title}
        </Title>
        <Detail>
          <DetailBox>
            <TempImage/>
            <div>{projectData.writer}</div>
            <div>{projectData.createdDate}</div>
          </DetailBox>
          <DetailBox>
            <div>Comment {projectData.comments.length}</div>
            <div>북마크 {projectData.views}</div>
            <div>조회 {projectData.views}</div>
          </DetailBox>
        </Detail>
      </TitleSection>
      <Container>
        <ProjectSection 
          projectData={{
            projectName: projectData.projectName,
            category: projectData.category,
            period: projectData.period,
            personnel: projectData.personnel,
            meetingOption: projectData.meetingOption,
            step: projectData.step,
            introduce: projectData.introduce,
            link: projectData.link
          }} 
        />
        <RecruitmentSection 
          recruitmentData={{
            roles: projectData.roles,
            skills: projectData.skills,
            article: projectData.article
          }}
        />
        <ProgressSection progressData={projectData.step} />
        <ProfileSection profileData={projectData.members}/>
        <CommentSection 
          comments={projectData.comments} 
          onCommentAdd={fetchProjectDetail}
        />
      </Container>
    </Wrapper>
  );
};

export default ProjectDetailPage;
