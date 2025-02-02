import React from 'react';
import { Section, Content, FirstColumn, SecondColumn, ThirdColumn, SectionTitle, DescriptionWrapper, LabelTitle, ContentText, Description, Tag, ChipsWrapper } from '../style/styles';

interface RecruitmentSectionProps {
  recruitmentData: any;
}

const RecruitmentSection = ({ recruitmentData }: RecruitmentSectionProps) => {
  return (
    <Section>
      <Content>
        <FirstColumn>
          <SectionTitle>Recruitment</SectionTitle>
          <DescriptionWrapper>어떤 사람을 모집하나요?</DescriptionWrapper>
        </FirstColumn>

        <SecondColumn>
          <LabelTitle>역할</LabelTitle>
          <ContentText>
            <ChipsWrapper>
              {recruitmentData.roles.map((role: string, index: number) => (
                <Tag key={index}>{role}</Tag>
              ))}
            </ChipsWrapper>
          </ContentText>
          <LabelTitle>필요 스킬</LabelTitle>
          <ContentText>
            <ChipsWrapper>
              {recruitmentData.skills.map((skill: string, index: number) => (
                <Tag key={index}>{skill}</Tag>
              ))}
            </ChipsWrapper>
          </ContentText>
        </SecondColumn>

        <ThirdColumn>
          <LabelTitle>모집글</LabelTitle>
          <Description>{recruitmentData.description}</Description>
        </ThirdColumn>
      </Content>
    </Section>
  );
};

export default RecruitmentSection; 