import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LuPen } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { PiSirenLight } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import ProjectSection from './components/ProjectSection';
import RecruitmentSection from './components/RecruitmentSection';
import ProgressSection from './components/ProgressSection';
import ProfileSection from './components/ProfileSection';
import CommentSection from './components/CommentSection';
import { getProjectDetail, deleteProject, addBookmark, removeBookmark } from '../api/projectdetail';


const Wrapper = styled.div`
`

const Container = styled.div`
  background-color: #151515;
  color: white;
  width: 70%;
  margin: 0 auto;
`;

const TitleSection = styled.div`
  margin: 4rem auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 3rem;
`

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #BDBDBD;
  margin-top: 2rem;
`

const DetailBox =styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`
const ProfileImage = styled.img`
  background-color: grey;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
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
  isBookmark: boolean;
  bookmarks: number;
  writerProfileImage: string;
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
      profileImage: string;
    };
    childComments: Array<{
      id: number;
      writer: string;
      content: string;
      createdLocalDateTime: string;
      profileImage: string;
    }>;
  }>;
}

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState<ProjectDetail | null>(null);
  const navigate = useNavigate();
  const myNickname = sessionStorage.getItem("nickname");

  const fetchProjectDetail = async () => {
    try {
      const response = await getProjectDetail(id);
      setProjectData(response.data);
    } catch (error) {
      console.error('프로젝트 상세 정보 조회 실패:', error);
    }
  };

  const registBookmark = async () => {
    try {
      await addBookmark(id);
      fetchProjectDetail();
    } catch (error) {
      console.error('북마크 등록 실패:', error);
    }
  }

  const deleteBookmark = async () => {
    try {
      await removeBookmark(id);
      fetchProjectDetail(); 
    } catch (error) {
      console.error('북마크 삭제 실패:', error);
    }
  }

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  if (!projectData) return <div>로딩 중...</div>;

  const writeClick = ()=>{
    if(myNickname !== projectData?.writer){
      alert("수정 권한이 없습니다.");
      return;
    }
    navigate(`/project/edit/${id}`);
  }

  const deleteClick = ()=>{
    deleteProject(id)
    navigate(`/project`);
  }

  return (
    <Wrapper>
    <Container>
      <TitleSection>
        <IconContainer>
          { projectData?.isBookmark === false &&
            <FaRegBookmark onClick={registBookmark} size={30} style={{color: "#E32929", cursor:"pointer"}}/>
          }
          { projectData?.isBookmark === true &&
            <FaBookmark onClick={deleteBookmark} size={30} style={{color: "#E32929", cursor:"pointer"}}/>
          }

          
          { myNickname === projectData?.writer && 
            (
              <>
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
                <MdDelete onClick={deleteClick} size={30} style={{color: "#E32929", cursor:"pointer"}}/>
              </>
            )
          }
          
        </IconContainer>
        <Title>
          {projectData.title}
        </Title>
        <Detail>
          <DetailBox>
            <ProfileImage 
              src={projectData.writerProfileImage|| '/default-profile-image.png'} 
              alt={projectData.writer} 
            />
            <div>{projectData.writer}</div>
            <div>{projectData.createdDate}</div>
          </DetailBox>
          <DetailBox>
            <div>
              Comment {
                projectData.comments.reduce(
                  (total, comment) => total + 1 + comment.childComments.length,
                  0
                )
              }
            </div>
            <div>북마크 {projectData.bookmarks}</div>
            <div>조회 {projectData.views}</div>
          </DetailBox>
        </Detail>
      </TitleSection>
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
