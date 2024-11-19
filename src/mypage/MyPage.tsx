// 2024-11-18 18:09 승균 작성
import React, {useState} from 'react';
import styled from 'styled-components';
import Header from '../asset/component/Header';
import Profile from './component/ProfileHeader';
import PersonalHistory from './page/PersonalHistory';
import Portfolio from './page/Portfolio';
import MemberEvaluation from './page/MemberEvaluation';
import MyActivity from './page/MyActivity';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #151515;
  color: #fff;
  padding-top: 120px;
  
  @media (max-width: 768px) {
    padding-top: 100px;
  }
`

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 5rem;
`

interface TabButtonProps {
  isActive: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  flex: 1;
  padding: 10px 0;
  border: none;
  background-color: ${({ isActive }) => (isActive ? '#E32929' : '#151515')};
  color: #F5F5F5;
  cursor: pointer;
  border: 1px solid ${({isActive}) => (isActive? '#E32929': '#9E9E9E')};
  font-size: 16px;
  font-family: 'Noto Sans';

  &:not(:last-child) {
    border-right: 1px solid #333;
  }

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#E32929' : '#151515')};
  }
`

type Tab = 'PersonalHistory' | 'Portfolio' | 'MemberEvaluation' | 'MyActivity';

const ContentContainer = styled.div<{ isPortfolio: boolean }>`
  width: ${({ isPortfolio }) => (isPortfolio ? '90%' : '75%')};
`

const MyPage = () => {

  const [activeTab, setActiveTab] = useState<Tab>('PersonalHistory');

  const renderContent = () => {
    switch (activeTab) {
      case 'PersonalHistory':
        return <PersonalHistory />;
      case 'Portfolio':
        return <Portfolio />;
      case 'MemberEvaluation':
        return <MemberEvaluation />;
      case 'MyActivity':
        return <MyActivity />;
      default:
        return <PersonalHistory />;
    }
  };

  return (
    <>
      <Header headerName="MyPage" />
      <Container>
        <Profile />
        <TabContainer>
          <TabButton isActive={activeTab === 'PersonalHistory'} onClick={() => setActiveTab('PersonalHistory')}>
            경력 및 활동이력
          </TabButton>
          <TabButton isActive={activeTab === 'Portfolio'} onClick={() => setActiveTab('Portfolio')}>
            포트폴리오
          </TabButton>
          <TabButton isActive={activeTab === 'MemberEvaluation'} onClick={() => setActiveTab('MemberEvaluation')}>
            팀원 평가
          </TabButton>
          <TabButton isActive={activeTab === 'MyActivity'} onClick={() => setActiveTab('MyActivity')}>
            내 활동
          </TabButton>
        </TabContainer>
        <ContentContainer isPortfolio={activeTab === 'Portfolio'}>
          {renderContent()}
        </ContentContainer>
      </Container>
    </>
  );
};

export default MyPage;