import React from 'react';
import styled from 'styled-components';
import { projectData } from './data/projectData';
import Header from '../asset/component/Header';
import { LuPen } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { PiSirenLight } from "react-icons/pi";
import ProjectSection from './components/ProjectSection';
import RecruitmentSection from './components/RecruitmentSection';
import ProgressSection from './components/ProgressSection';
import ProfileSection from './components/ProfileSection';
import CommentSection from './components/CommentSection';

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

const ProjectDetailPage = () => {
  return (
    <Wrapper>
      <Header headerName = "" isMain = {false}/>
      <TitleSection>
        <IconContainer>
          <FaRegBookmark size={30} style={{color: "#E32929"}}/>
          <PiSirenLight size={30} style={{color: "#E32929"}}/>
          <LuPen size={30} style={{color: "#E32929"}}/>
        </IconContainer>
        <Title>
          프로젝트 디자이너 구합니다
        </Title>
        <Detail>
          <DetailBox>
            <TempImage/>
            <div>홍길동</div>
            <div>24.08.08</div>
          </DetailBox>
          <DetailBox>
            <div>Comment 2</div>
            <div>북마크 4</div>
            <div>조회 10</div>
          </DetailBox>
        </Detail>
      </TitleSection>
      <Container>
        <ProjectSection projectData={projectData.project} />
        <RecruitmentSection recruitmentData={projectData.recruitment} />
        <ProgressSection progressData={projectData.progress} />
        <ProfileSection profileData={projectData.profile}/>
        <CommentSection />
      </Container>
    </Wrapper>
  );
};

export default ProjectDetailPage;
