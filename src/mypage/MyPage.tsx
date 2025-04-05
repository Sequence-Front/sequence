// 2024-11-18 18:09 승균 작성
// 2024-11-19 18:47 준용 작성
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Header from '../asset/component/Header';
import Profile from './component/ProfileHeader';
import PersonalHistory from './page/PersonalHistory';
import Portfolio from './page/Portfolio';
import MemberEvaluation from './page/MemberEvaluation';
import MyActivity from './page/MyActivity';
import { getMyInfo } from '../api/myInfo';
import { HistoryDataType } from './types/history.types';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #151515;
  color: #fff;
  padding-top: 120px;
  
`

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;
  margin-bottom: clamp(3rem, 5vw, 5rem);
`

interface TabButtonProps {
  isActive: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  flex: 1;
  padding: clamp(0.3rem, 2vw, 1.5rem);
  margin-top: clamp(0.5rem, 2vw, 2rem);
  border: none;
  background-color: ${({ isActive }) => (isActive ? '#E32929' : '#151515')};
  color: #F5F5F5;
  cursor: pointer;
  border: 1px solid ${({isActive}) => (isActive? '#E32929': '#9E9E9E')};
  font-size: clamp(0.6rem, 2vw, 1.3rem);
  font-family: 'Noto Sans';

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#E32929' : '#151515')};
  }
`

type Tab = 'PersonalHistory' | 'Portfolio' | 'MemberEvaluation' | 'MyActivity';

const ContentContainer = styled.div<{ isPortfolio: boolean }>`
  width: ${({ isPortfolio }) => (isPortfolio ? '90%' : '75%')};
`

interface MyPageData {
  basicInfo: {
    address: string;
    birth: string;
    degree: string;
    desiredJob: string[];
    entranceDate: string;
    gender: string;
    grade: string;
    graduationDate: string;
    major: string;
    name: string;
    nickname: string;
    phone: string;
    schoolName: string;
    skillCategory: string[];
    username: string;
  };
  careerHistory: {
    awards: any[];
    careers: any[];
    experiences: any[];
    introduction: string;
    portfolios: string[];
  };
  myActivities: {
    myArchive: {
      bookmarkedPosts: any[];
      writtenPosts: Array<{
        title: string;
        articleId: number;
        createdDate: string;
        numberOfComments: number;
      }>;
    };
    myProject: {
      bookmarkedPosts: any[];
      writtenPosts: any[];
    };
  };
  portfolio: {
    archivePageResponseDTO: {
      archives: Array<{
        id: number;
        writerNickname: string;
        title: string;
        description: string;
        startDate: string;
        endDate: string;
        role: string;
        image?: string;
      }>;
      totalPages: number;
    };
  };
}

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('PersonalHistory');
  const [profileData, setProfileData] = useState<MyPageData | null>(null);
  const nickname = localStorage.getItem('nickname');

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMyInfo();
      setProfileData(response);
    };
    fetchData();
  }, []);

  const isOwnProfile = nickname === profileData?.basicInfo.nickname;

  const renderContent = () => {
    if (!profileData) return null;

    switch (activeTab) {
      case 'PersonalHistory':
        return <PersonalHistory careerHistory={profileData.careerHistory} />;
      case 'Portfolio':
        return <Portfolio portfolioData={profileData.portfolio.archivePageResponseDTO} />;
      case 'MemberEvaluation':
        return <MemberEvaluation />;
      case 'MyActivity':
        return <MyActivity activities={profileData.myActivities} />;
      default:
        return <PersonalHistory careerHistory={profileData.careerHistory} />;
    }
  };

  return (
    <>
      <Header headerName="MyPage" />
      <Container>
        <Profile 
          name={profileData?.basicInfo.nickname} 
          birth={profileData?.basicInfo.birth}
          skills={profileData?.basicInfo.skillCategory || []}
          desiredJobs={profileData?.basicInfo.desiredJob || []}
          // introduction={profileData?.careerHistory.introduction || ""}
        />
        <TabContainer>
          <TabButton 
            isActive={activeTab === 'PersonalHistory'} 
            onClick={() => setActiveTab('PersonalHistory')}
          >
            경력 및 활동이력
          </TabButton>
          <TabButton 
            isActive={activeTab === 'Portfolio'} 
            onClick={() => setActiveTab('Portfolio')}
          >
            포트폴리오
          </TabButton>
          {/* <TabButton 
            isActive={activeTab === 'MemberEvaluation'} 
            onClick={() => setActiveTab('MemberEvaluation')}
          >
            팀원 평가
          </TabButton> */}
         
          {isOwnProfile && (
            <TabButton 
              isActive={activeTab === 'MyActivity'} 
              onClick={() => setActiveTab('MyActivity')}
            >
              내 활동
            </TabButton>
          )}
        </TabContainer>
        <ContentContainer isPortfolio={activeTab === 'Portfolio'}>
          {renderContent()}
        </ContentContainer>
      </Container>
    </>
  );
};

export default MyPage;