import React from 'react';
import styled from 'styled-components';
import Sequence from '../image/Sequence.svg'
import { useNavigate, useLocation } from 'react-router-dom';
import alert from '../image/alert.png'

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin: 0 auto;
  justify-content: space-between;
  flex-direction: row;
  background-color: #151515;
  position: relative;
  z-index: 3;
`
const TitleContainer = styled.div`
  display: flex;
  width: 10%;
  margin-left : clamp(3.5rem, 3.5vw, 7rem);
  flex-direction: row;
  align-items: flex-end;
  cursor: pointer;
`

const Logo = styled.img`
  display: flex;
  margin-bottom: clamp(0.1rem, 0.6vw, 1rem);
  width: clamp(4rem, 8vw, 8rem);
`

const ContentContainer = styled.div`
  display: flex;
  width: 49%;
  justify-content: space-between;
`

const ContentWrap = styled.div`
  display : flex;
  width: 33%;
  justify-content: space-evenly;
`

const Content = styled.div<{ isActive: boolean }>`
  display: flex;
  color: ${(props) => (props.isActive ? '#E32929' : 'white')};
  font-size: clamp(0.8rem, 1.6vw, 1.6rem);
  font-family: 'Playfair Display', serif;
  cursor: pointer;
`

const LoginContainer = styled.div`
  display : flex;
  flex : 1;
  justify-content: flex-end;
`

const Login = styled.div`
  display: flex;
  margin-right: clamp(3rem, 6vw, 6rem);
  cursor: pointer;
  border: 2px solid #E32929;
  padding : 2px clamp(10px, 1.2vw, 1.2rem);
  font-size: clamp(10px, 1.5vw, 1.5rem);
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color : #E32929;
`

const UserContainer = styled.div`
  display: flex;
  margin-right: clamp(2.6rem, 5vw, 5rem);
  width: 30%;
  gap: 30%;
`
const UserProfile = styled.img`
  display: flex;
  width: clamp(1.3rem, 2.6vw, 2.6rem);
  height: clamp(1.3rem, 2.6vw, 2.6rem);
  border-radius: 50%;
`

const AlertImg = styled.img`
  display : flex;
  width: clamp(1.3rem, 2.6vw, 2.6rem);
  height: clamp(1.3rem, 2.6vw, 2.6rem);
`

function Header({ headerName, isMain = false }: { headerName: string; isMain?: boolean } ) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = false;
  const getCurrentHeader = () => {
    if (location.pathname.startsWith('/project')) return 'Project';
    if (location.pathname.startsWith('/Announcement')) return 'Announcement';
    if (location.pathname.startsWith('/Archive')) return 'Archive';
    return '';
  };

  const currentHeader = getCurrentHeader();
  return (
    <Container>
      {isMain ? (
        <TitleContainer onClick={() => window.location.reload()}>
          <Logo src={Sequence} />
        </TitleContainer>
      ) : (
        <TitleContainer onClick={() => navigate('/')}>
          <Logo src={Sequence} />
        </TitleContainer>
      )}
      <ContentContainer>
        <ContentWrap>
          <Content
            onClick={() => navigate('/project')}
            isActive={currentHeader === 'Project'}
          >
            Project
          </Content>
        </ContentWrap>
        <ContentWrap>
          <Content
            onClick={() => navigate('/Announcement')}
            isActive={currentHeader === 'Announcement'}
          >
            Announcement
          </Content>
        </ContentWrap>
        <ContentWrap>
          <Content
            onClick={() => navigate('/Archive')}
            isActive={currentHeader === 'Archive'}
          >
            Archive
          </Content>
        </ContentWrap>
      </ContentContainer>
      <LoginContainer>
        {isLogin ? (
          <Login onClick={() => navigate('/login')}>Log In</Login>
      ) : (
          <UserContainer>
            <AlertImg src={alert}/>
            <UserProfile src= {"https://search.pstatic.net/sunny/?src=https%3A%2F%2Fst.depositphotos.com%2F1177973%2F3836%2Fi%2F450%2Fdepositphotos_38368579-stock-photo-little-kitten-isolated-on-white.jpg&type=a340"} />
          </UserContainer>
      )}
      </LoginContainer>
      
    </Container>
  );
};

export default Header;
