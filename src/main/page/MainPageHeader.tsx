import React from 'react';
import styled from 'styled-components';
import LogoS from '../../asset/image/MainLogo.png'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const Logo = styled.img`
  display: flex;
  margin : 2rem 1rem;
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

function Header() {

  return (
    <Container>
      <Logo src = {LogoS} onClick = {() => window.location.reload()} />
      <ProjectContainer>
        <Now>
          NOW
        </Now>
        <Project>
          Project
        </Project>
      </ProjectContainer>  
    </Container>
  );
};

export default Header;
