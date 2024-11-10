import React, {useState} from 'react';
import styled from 'styled-components';
import LogoS from '../../asset/image/LogoS.png'
import Sidebar from './Sidebar';

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
`
const TitleContainer = styled.div`
  display: flex;
  margin-left : clamp(2rem, 2vw, 7rem);
  flex-direction: row;
  align-items: flex-end;
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
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  z-index: -1;
`

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <Container
    onMouseEnter={() => setShowSidebar(true)}
    onMouseLeave={() => setShowSidebar(false)}>
      <TitleContainer>
        <Logo src={LogoS} />
        <Title>equence</Title>
      </TitleContainer>
      <ProjectContainer>
        <Now>NOW</Now>
        <Project>Project</Project>
      </ProjectContainer>
      <SidebarContainer show={showSidebar}>
        <Sidebar />
      </SidebarContainer>
    </Container>
  );
};

export default Header;
