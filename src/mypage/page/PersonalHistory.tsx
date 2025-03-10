// 2024-11-18 18:09 승균 작성
import React, { useState } from 'react';
import styled from 'styled-components';
import { HistoryContainer, Introduction, PortfolioItem, PortfolioLink } from '../styles/PersonalHistory.styles';
import HistorySection from '../component/HistorySection';
import { HistoryDataType } from '../types/history.types';
import { dummyData } from '../data/dummyData';
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

const PersonalHistory = () => {
  const [historyData, setHistoryData] = useState<HistoryDataType>(dummyData);
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');
  const currentProfileNickname = new URLSearchParams(window.location.search).get('nickname');
  
  const isOwnProfile = !currentProfileNickname || nickname === currentProfileNickname;

  return (
    <HistoryContainer>
      <HistorySection title="자기소개" items={[]}>
        <Introduction>{historyData.introduction}</Introduction>
      </HistorySection>

      <HistorySection title="경험 및 활동이력" items={historyData.activities} />
      <HistorySection title="경력" items={historyData.career} />
      <HistorySection title="자격증" items={historyData.certification} />

      <HistorySection title="포트폴리오" items={[]}>
        {historyData.portfolio.map((item, index) => (
          <PortfolioItem key={index}>
            {/* <PortfolioLink href={item}>{item}</PortfolioLink> // 포트폴리오 링크 추가 */}
            <PortfolioLink>{item}</PortfolioLink>
          </PortfolioItem>
        ))}
      </HistorySection>

      {!isOwnProfile && (
        <>
          <EditButton>로그인 정보 수정 <FaArrowRight /> </EditButton>
          <WithDrawButton onClick={() => navigate('/withdraw')}>회원탈퇴</WithDrawButton>
        </>
      )}
    </HistoryContainer>
  );
};

export default PersonalHistory; 