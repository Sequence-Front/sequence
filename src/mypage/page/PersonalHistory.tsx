// 2024-11-18 18:09 승균 작성
import React from 'react';
import styled from 'styled-components';
import { HistoryContainer, Introduction, PortfolioItem, PortfolioLink } from '../styles/PersonalHistory.styles';
import HistorySection from '../component/HistorySection';
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

interface PersonalHistoryProps {
  careerHistory: {
    awards: Array<{
      awardName: string;
      organizer: string;
      awardDuration: string;
    }>;
    careers: Array<{
      companyName: string;
      careerDescription: string;
      startDate: string;
      endDate: string;
    }>;
    experiences: Array<{
      experienceName: string;
      experienceDescription: string;
      startDate: string;
      endDate: string;
    }>;
    introduction: string;
    portfolios: string[];
  };
}

const PersonalHistory = ({ careerHistory }: PersonalHistoryProps) => {
  const navigate = useNavigate();
  const nickname = sessionStorage.getItem('nickname');
  const currentProfileNickname = new URLSearchParams(window.location.search).get('nickname');
  
  const isOwnProfile = !currentProfileNickname || currentProfileNickname === nickname;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  const formatExperiences = () => {
    return careerHistory.experiences.map(exp => ({
      category: '활동',
      title: exp.experienceName,
      period: `${formatDate(exp.startDate)} ~ ${formatDate(exp.endDate)}`,
      description: exp.experienceDescription
    }));
  };

  const formatCareers = () => {
    return careerHistory.careers.map(career => ({
      category: '경력',
      title: career.companyName,
      period: `${formatDate(career.startDate)} ~ ${formatDate(career.endDate)}`,
      description: career.careerDescription
    }));
  };

  const formatAwards = () => {
    return careerHistory.awards.map(award => ({
      category: '수상',
      title: award.awardName,
      period: formatDate(award.awardDuration),
      description: `주최: ${award.organizer}`
    }));
  };

  return (
    <HistoryContainer>
      <HistorySection title="자기소개" items={[]}>
        <Introduction>
          {careerHistory.introduction || "자기소개가 없습니다."}
        </Introduction>
      </HistorySection>

      <HistorySection 
        title="경험 및 활동이력" 
        items={formatExperiences()} 
      />

      <HistorySection 
        title="경력" 
        items={formatCareers()} 
      />

      <HistorySection 
        title="수상 내역" 
        items={formatAwards()} 
      />

      <HistorySection title="포트폴리오" items={[]}>
        {careerHistory.portfolios.length > 0 ? (
          careerHistory.portfolios.map((item, index) => (
            <PortfolioItem key={index}>
              <PortfolioLink href={item} target="_blank" rel="noopener noreferrer">
                {item}
              </PortfolioLink>
            </PortfolioItem>
          ))
        ) : (
          <Introduction>등록된 포트폴리오가 없습니다.</Introduction>
        )}
      </HistorySection>

      {isOwnProfile && (
        <>
          <EditButton>로그인 정보 수정 <FaArrowRight /> </EditButton>
          <WithDrawButton onClick={() => navigate('/withdraw')}>회원탈퇴</WithDrawButton>
        </>
      )}
    </HistoryContainer>
  );
};

export default PersonalHistory; 