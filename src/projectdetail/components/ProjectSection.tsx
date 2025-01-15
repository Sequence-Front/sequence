import React from 'react';
import { Section, Content, FirstColumn, SecondColumn, ThirdColumn, SectionTitle, DescriptionWrapper, LabelTitle, ContentText, Description, Tag } from '../style/styles';

interface ProjectSectionProps {
  projectData: any;
}

const ProjectSection = ({ projectData }: ProjectSectionProps) => {
  return (
    <Section>
      <Content>
        <FirstColumn>
          <SectionTitle>Project</SectionTitle>
          <DescriptionWrapper>어떤 프로젝트인가요?</DescriptionWrapper>
        </FirstColumn>

        <SecondColumn>
          <LabelTitle>제목</LabelTitle>
          <ContentText>{projectData.title}</ContentText>
      
          <LabelTitle>기간</LabelTitle>
          <ContentText>{projectData.period}</ContentText>
      
          <LabelTitle>분야</LabelTitle>
          <ContentText>
            {projectData.category.map((item: string, index: number) => (
              <Tag key={index}>{item}</Tag>
            ))}
          </ContentText>
        </SecondColumn>

        <ThirdColumn>
          <LabelTitle>프로젝트 소개</LabelTitle>
          <Description>{projectData.description}</Description>
        </ThirdColumn>
      </Content>
    </Section>
  );
};

export default ProjectSection; 