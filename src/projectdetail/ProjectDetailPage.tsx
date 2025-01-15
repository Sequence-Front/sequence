import React from 'react';
import styled from 'styled-components';
import { projectData } from './projectData';
import Header from '../asset/component/Header';

const Wrapper = styled.div`
`

const Container = styled.div`
  background-color: #151515;
  color: white;
  padding: 2rem;
  width: 75%;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.div`
  color: #e32929;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 200px 200px 1fr;
  grid-column-gap: 8rem;

  & > div:last-child {
    margin-left: -4rem;
  }
`;

const LabelTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
`;

const LastColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
`;

const ChipsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const ContentText = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const Description = styled.p`
  line-height: 1.5;
  max-width: 50%;
`;

const Tag = styled.div`
  display: inline-block;
  background-color: transparent;
  color: white;
  padding: 0.25rem 0.5rem;
  border: 1px solid white;
  border-radius: 20px;
  margin-right: 0.5rem;
  white-space: nowrap;
`;

const DescriptionWrapper = styled.div`
  font-size: 1.2rem;
`;

const TitleSection = styled.div`
  margin: 4rem auto;
  width: 75%;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 5rem;
`

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
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
  gap: 1rem;
 `

const ProjectDetailPage = () => {
  return (
    <Wrapper>
    <Header headerName = "" isMain = {false}/>
    <TitleSection>
      <IconContainer>
        <div>아이콘</div>
        <div>아이콘</div>
        <div>아이콘</div>
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
      <Section>
        <Content>
          <div>
            <SectionTitle>Project</SectionTitle>
            <DescriptionWrapper>어떤 프로젝트인가요?</DescriptionWrapper>
          </div>

          <div>
            <LabelTitle>제목</LabelTitle>
            <ContentText>{projectData.project.title}</ContentText>
            
            <LabelTitle>기간</LabelTitle>
            <ContentText>{projectData.project.period}</ContentText>
            
            <LabelTitle>분야</LabelTitle>
            <ContentText>
              {projectData.project.category.map((item, index) => (
                <Tag key={index}>{item}</Tag>
              ))}
            </ContentText>
          </div>

          <LastColumnContent>
            <LabelTitle>프로젝트 소개</LabelTitle>
            <Description>{projectData.project.description}</Description>
          </LastColumnContent>
        </Content>
      </Section>

      <Section>
        <Content>
          <div>
            <SectionTitle>Recruitment</SectionTitle>
            <DescriptionWrapper>어떤 사람을 모집하나요?</DescriptionWrapper>
          </div>

          <div>
            <LabelTitle>역할</LabelTitle>
            <ContentText>
              <ChipsWrapper>
                {projectData.recruitment.roles.map((role, index) => (
                  <Tag key={index}>{role}</Tag>
                ))}
              </ChipsWrapper>
            </ContentText>
            <LabelTitle>필요 스킬</LabelTitle>
            <ContentText>
              <ChipsWrapper>
                {projectData.recruitment.skills.map((skill, index) => (
                  <Tag key={index}>{skill}</Tag>
                ))}
              </ChipsWrapper>
            </ContentText>
          </div>

          <LastColumnContent>
            <LabelTitle>모집글</LabelTitle>
            <Description>{projectData.recruitment.description}</Description>
          </LastColumnContent>
        </Content>
      </Section>

      <Section>
        <Content>
          <div>
            <SectionTitle>Progress</SectionTitle>
            <DescriptionWrapper>진행방식은 어떤가요?</DescriptionWrapper>
          </div>

          <div>
            <LabelTitle>회의</LabelTitle>
            <ContentText>
              <ChipsWrapper>
                {projectData.progress.meeting.map((item, index) => (
                  <Tag key={index}>{item}</Tag>
                ))}
              </ChipsWrapper>
            </ContentText>
            
            <LabelTitle>프로젝트 단계</LabelTitle>
            <ContentText>
              <ChipsWrapper>
                {projectData.progress.stage.map((item, index) => (
                  <Tag key={index}>{item}</Tag>
                ))}
              </ChipsWrapper>
            </ContentText>
          </div>

          <LastColumnContent>
            <LabelTitle>링크 및 첨부</LabelTitle>
            <Description>{projectData.progress.reference}</Description>
          </LastColumnContent>
        </Content>
      </Section>
    </Container>
    </Wrapper>
  );
};

export default ProjectDetailPage;
