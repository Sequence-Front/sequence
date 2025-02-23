import React from 'react';
import { Section, Content, FirstColumn, SecondColumn, ThirdColumn, SectionTitle, DescriptionWrapper, LabelTitle, ContentText, Description, Tag } from '../style/styles';

interface ProgressSectionProps {
  progressData: string; 
}

const ProgressSection = ({ progressData }: ProgressSectionProps) => {
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
            <Tag>{progressData}</Tag>
          </ContentText>
        </SecondColumn>

        <ThirdColumn>
        </ThirdColumn>
      </Content>
    </Section>
  );
};

export default ProgressSection; 