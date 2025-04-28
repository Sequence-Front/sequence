import React from 'react';
import { Section, Content, FirstColumn, SecondColumn, ThirdColumn, SectionTitle, DescriptionWrapper, LabelTitle, ContentText, Description, Tag } from '../style/styles';

interface ProgressSectionProps {
  progressData: string; 
}

const ProgressSection = ({ progressData }: ProgressSectionProps) => {

  const getProgressDisplay = (progress: string) => {
    const periodMapping: { [key: string]: string } = {
      'BEFORE_START': '개발 전',
      'PLANNING': '기획 단계',
      'DESIGNING': '디자인 단계',
      'DEVELOPING': '개발 단계',
      'IN_BUSINESS': '사업 단계'
    };
    return periodMapping[progress] || progress;
  };

  return (
    <Section>
      <Content>
        <FirstColumn>
          <SectionTitle>Progress</SectionTitle>
          <DescriptionWrapper>진행방식은 어떤가요?</DescriptionWrapper>
        </FirstColumn>

        <SecondColumn>
          <LabelTitle>프로젝트 단계</LabelTitle>
          <ContentText>
            <Tag>{getProgressDisplay(progressData)}</Tag>
          </ContentText>
        </SecondColumn>

        <ThirdColumn>
        </ThirdColumn>
      </Content>
    </Section>
  );
};

export default ProgressSection; 