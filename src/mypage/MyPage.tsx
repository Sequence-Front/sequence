// 2024-11-17 승균 작성
import React from 'react';
import styled from 'styled-components';
import Header from '../asset/component/Header';
import Profile from './component/ProfileHeader';
import PersonalHistory from './component/PersonalHistory';
import Portfolio from './component/Portfolio';
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
`;

const MyPage = () => {
    return (
        <>
            <Header headerName="MyPage" />
            <Container>
              <div style = {{width:'75%'}}>
              <Profile />
              <Portfolio />
              <MemberEvaluation />
              <PersonalHistory />
              <MyActivity />
              </div>
            </Container>
        </>
    );
};

export default MyPage;