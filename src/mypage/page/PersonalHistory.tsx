// 2024-11-18 18:09 승균 작성
import React from 'react';
import styled from 'styled-components';
import { HistoryContainer, Introduction, PortfolioItem, PortfolioLink } from '../styles/PersonalHistory.styles';
import HistorySection from '../component/HistorySection';
import { HistoryDataType, ExperienceType, AwardType } from '../types/history.types';
import { SignUpButton } from '../../login/style/LoginStyle';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EditButton = styled(SignUpButton)`
  margin-bottom: -3rem;
`;

const WithDrawButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9E9E9E;
  font-size: 1.2rem;
  margin-bottom: 5rem;
  text-decoration: underline;
  cursor: pointer;
`;

const getExperienceTypeKorean = (type: ExperienceType): string => {
  const typeMap: Record<ExperienceType, string> = {
    [ExperienceType.EXTERNAL_ACTIVITY]: '대외활동',
    [ExperienceType.EDUCATION]: '교육',
    [ExperienceType.VOLUNTEER]: '봉사',
    [ExperienceType.CLUB]: '동아리',
    [ExperienceType.ETC]: '기타'
  };
  return typeMap[type];
};

const getAwardTypeKorean = (type: AwardType): string => {
  const typeMap: Record<AwardType, string> = {
    [AwardType.CERTIFICATE]: '자격증',
    [AwardType.AWARD]: '수상'
  };
  return typeMap[type];
};

interface PersonalHistoryProps {
  data: HistoryDataType;
}

const PersonalHistory = ({ data }: PersonalHistoryProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatExperienceItems = (items: any[]) => {
    return items.map(item => ({
      title: item.experienceName || item.companyName || item.awardName,
      category: item.experienceType ? getExperienceTypeKorean(item.experienceType) : 
                item.awardType ? getAwardTypeKorean(item.awardType) : '경력',
      period: `${formatDate(item.startDate)} ~ ${formatDate(item.endDate || item.awardDuration)}`,
      description: item.experienceDescription || item.careerDescription || `${item.organizer} - ${item.awardName}`
    }));
  };

  return (
    <HistoryContainer>
      <HistorySection title="자기소개" items={[]}>
        <Introduction>{data.introduction}</Introduction>
      </HistorySection>

      <HistorySection 
        title="경험 및 활동이력" 
        items={formatExperienceItems(data.experiences)} 
      />
      <HistorySection 
        title="경력" 
        items={formatExperienceItems(data.careers)} 
      />
      <HistorySection 
        title="자격증" 
        items={formatExperienceItems(data.awards)} 
      />

      <HistorySection title="포트폴리오" items={[]}>
        {data.portfolio.map((item, index) => (
          <PortfolioItem key={index}>
            <PortfolioLink href={item} target="_blank" rel="noopener noreferrer">
              {item}
            </PortfolioLink>
          </PortfolioItem>
        ))}
      </HistorySection>

      <EditButton>로그인 정보 수정 <FaArrowRight /> </EditButton>
      <WithDrawButton onClick={() => navigate('/withdraw')}>회원탈퇴</WithDrawButton>
    </HistoryContainer>
  );
};

export default PersonalHistory; 