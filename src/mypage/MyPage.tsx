// 2024-11-17 승균 작성
import React from 'react';
import styled from 'styled-components';
import Header from '../asset/component/Header';
import Profile from './component/ProfileHeader';
import PersonalHistory from './component/PersonalHistory';
import Portfolio from './component/Portfolio';
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
`;

const MyPage = () => {
    return (
        <>
            <Header headerName="MyPage" />
            <Container>
                <Profile />
                <PersonalHistory />
                <Portfolio />
            </Container>
        </>
    );
};

export default MyPage;