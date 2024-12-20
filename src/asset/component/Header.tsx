import React from 'react';
import styled from 'styled-components';
import Sequence from '../image/Sequence.svg'
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1.5rem 0;
  margin: 0 auto;
  justify-content: space-between;
  flex-direction: row;
  background-color: #151515;
  position: relative;
  z-index: 3;
`
const TitleContainer = styled.div`
  display: flex;
  width: 25%;
  margin-left : clamp(2rem, 2vw, 7rem);
  flex-direction: row;
  align-items: flex-end;
  cursor: pointer;
`

const Logo = styled.img`
  display: flex;
  margin-bottom: clamp(0.1rem, 0.6vw, 1rem);
  width: clamp(5rem, 10vw, 10rem);
`

const ContentContainer = styled.div`
  display: flex;
  width: 60%;
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
  font-size: clamp(1rem, 2vw, 2rem);
  font-family: 'Playfair Display', serif;
  cursor: pointer;
`

const LoginContainer = styled.div`
  display : flex;
  flex : 1;
  justify-content: space-around;
`

const Login = styled.div`
  display: flex;
  margin-right: 1rem;
  cursor: pointer;
  border: 2px solid #E32929;
  padding : 2px clamp(10px, 1.2vw, 1.2rem);
  font-size: clamp(10px, 1.5vw, 1.5rem);
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color : #E32929;
`


function Header({ headerName, isMain = false }: { headerName: string; isMain?: boolean } ) {
  const navigate = useNavigate();
  const location = useLocation();

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
        <Login onClick={() => navigate('/login')}>Log In</Login>
      </LoginContainer>
    </Container>
  );
};

export default Header;



/*
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1.5rem 0;
  margin: 0 auto;
  justify-content: space-between;
  flex-direction: row;
  background-color: #151515;
  position: relative;
  z-index: 2;
`
const TitleContainer = styled.div`
  display: flex;
  margin-left : clamp(2rem, 2vw, 7rem);
  flex-direction: row;
  align-items: flex-end;
  cursor: pointer;
`

const Logo = styled.img`
  display: flex;
  margin-bottom: clamp(0.1rem, 0.6vw, 1rem);
  width: clamp(1.2rem, 1.7vw, 3rem);
  height: clamp(3rem,3.5vw, 6rem);
`

const Title = styled.div`
  display: flex;
  font-size: clamp(2.6rem, 3vw, 5.1rem);
  color: #E32929;
  font-family: 'Impact', sans-serif;
  margin: 0;
  margin-left: 1px;
  align-self: flex-end;
`

const MainLogoStyle = styled.img`
  display: flex;
  margin : 0.5rem 2rem;
  position : relative;
  width: clamp(2rem, 5vw, 6rem);
  height: clamp(2.6rem, 6.4vw, 7rem);
  color : white;
  cursor: pointer;
`

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top : clamp(5px, 1vw, 10px);
`

const Now = styled.div`
  display : flex;
  align-items: flex-start;
  justify-content: flex-end;
  color: #e22828;
  font-size: clamp(0.75rem, 1.5vw , 2rem);
  margin-right : 10px;
  font-family: 'SUIT' ;
`

const Project = styled.div`
  top: 20px;
  right: 20px;
  color: white;
  margin : clamp(0.5rem, 1vw, 1rem) clamp(1.5rem, 2.5vw, 3rem) 0 0;
  font-size: clamp(2.6rem, 3vw, 6rem);
  font-weight: 600;
  font-family: 'Alike', serif;
  
`

const SidebarContainer = styled.div<{ show: boolean }>`
  position: absolute;
  left: 0;
  width: 100%;
  background-color: white;
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};

`

function Header({ headerName, isMain = false }: { headerName: string; isMain?: boolean } ) {
  const [showSidebar, setShowSidebar] = useState(false);

  const  navigate = useNavigate();

  return (
    <div onMouseEnter={() => setShowSidebar(true)}
    onMouseLeave={() => setShowSidebar(false)}>
    <Container>
    {isMain ? (
          <MainLogoStyle onClick = {() => window.location.reload()} src={MainLogo} alt="Main Logo" />
        ) : (
          <TitleContainer onClick = {()=>navigate('/')}>
            <Logo src={LogoS} />
            <Title>equence</Title>
          </TitleContainer>
        )}
      <ProjectContainer>
        <Now>NOW</Now>
        <Project>{headerName}</Project>
      </ProjectContainer>
    </Container>
    <SidebarContainer show={showSidebar}>
        <Sidebar isMain = {isMain} />
    </SidebarContainer>
    </div>
  );
};

export default Header;


*/