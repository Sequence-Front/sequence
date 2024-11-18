import React from 'react';
import styled from 'styled-components';
import Sequence from './page/Sequence';
import About from './page/About';
import Partner from './page/Partner';
import Experience from './page/Experience';
import WhoMade from './page/WhoMade';
import Benefit from './page/Benefit';
import Header from '../asset/component/Header';


const Container = styled.div`
    background-color: #151515;
`;

const BlackSection = styled.div`
    background-color: #0f0f0f;
    height: 10vh;
`;

const Blank = styled.div`
    height: 500px;
    background-color: #151515;
`;

function MainPage() {


  return (
    <Container>
        <Header headerName='Project' isMain = {true}/>
        <Blank style={{height : '200px'}}/>
        <Sequence/>
        <Blank/>
        <About/>
        <Blank/>
        <Benefit/>
        <Blank/>
        <Partner/>
        <Blank/>
        <Experience/>
        <Blank/>
        <Blank/>
        <WhoMade/>
        <BlackSection/>
    </Container>
  );
}

export default MainPage;
