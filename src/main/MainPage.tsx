import React from 'react';
import styled from 'styled-components';
import Partner from './page/Partner';
import Experience from './page/Experience';
import WhoMade from './page/WhoMade';

const Container = styled.div`
    background-color: #151515;
`;

function MainPage() {
  return (
    <Container>
        <Partner/>
        <Experience/>
        <WhoMade/>
    </Container>
  );
}

export default MainPage;
