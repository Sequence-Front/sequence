import React from 'react';
import { Section, Content, FirstColumn, SecondColumn, ThirdColumn, SectionTitle, DescriptionWrapper, LabelTitle, ContentText, Description, Tag } from '../style/styles';

interface ProjectSectionProps {
  projectData: {
    projectName: string;
    period: string;
    category: string;
    personnel: number;
    meetingOption: string;
    step: string;
    introduce: string;
    link: string;
  };
}

const ProjectSection = ({ projectData }: ProjectSectionProps) => {
  const getPeriodDisplay = (period: string) => {
    const periodMapping: { [key: string]: string } = {
      'ONE_MONTH_LESS': '1개월 이하',
      'ONE_TO_THREE_MONTH': '1개월 ~ 3개월',
      'THREE_TO_SIX_MONTH': '3개월 ~ 6개월',
      'SIX_TO_ONE_YEAR': '6개월 ~ 1년',
      'OVER_ONE_YEAR': '1년 이상'
    };
    return periodMapping[period] || period;
  };

  return (
    <Section>
      <Content>
        <FirstColumn>
          <SectionTitle>Project</SectionTitle>
          <DescriptionWrapper>어떤 프로젝트인가요?</DescriptionWrapper>
        </FirstColumn>

        <SecondColumn>
          <LabelTitle>제목</LabelTitle>
          <ContentText>{projectData.projectName}</ContentText>
      
          <LabelTitle>기간</LabelTitle>
          <ContentText>{getPeriodDisplay(projectData.period)}</ContentText>
      
          <LabelTitle>분야</LabelTitle>
          <ContentText>
            <Tag>{projectData.category}</Tag>
          </ContentText>

          <LabelTitle>인원</LabelTitle>
          <ContentText>{projectData.personnel}명</ContentText>

          <LabelTitle>미팅 방식</LabelTitle>
          <ContentText>{projectData.meetingOption}</ContentText>

          <LabelTitle>프로젝트 링크</LabelTitle>
          <ContentText>{projectData.link}</ContentText>
        </SecondColumn>

        <ThirdColumn>
          <LabelTitle>프로젝트 소개</LabelTitle>
          <Description>{projectData.introduce}</Description>
        </ThirdColumn>
      </Content>
    </Section>
  );
};

export default ProjectSection; 