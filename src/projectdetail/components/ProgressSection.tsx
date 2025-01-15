import React from 'react';
import { Section, Content, FirstColumn, SecondColumn, ThirdColumn, SectionTitle, DescriptionWrapper, LabelTitle, ContentText, Description, Tag, ChipsWrapper } from '../style/styles';

interface ProgressSectionProps {
  progressData: any;
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
          <LabelTitle>회의</LabelTitle>
          <ContentText>
            <ChipsWrapper>
              {progressData.meeting.map((item: string, index: number) => (
                <Tag key={index}>{item}</Tag>
              ))}
            </ChipsWrapper>
          </ContentText>
          
          <LabelTitle>프로젝트 단계</LabelTitle>
          <ContentText>
            <ChipsWrapper>
              {progressData.stage.map((item: string, index: number) => (
                <Tag key={index}>{item}</Tag>
              ))}
            </ChipsWrapper>
          </ContentText>
        </SecondColumn>

        <ThirdColumn>
          <LabelTitle>링크 및 첨부</LabelTitle>
          <Description>{progressData.reference}</Description>
        </ThirdColumn>
      </Content>
    </Section>
  );
};

export default ProgressSection; 