import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #151515;
  justify-content: space-between;
  flex-direction: row;
`

const RightSide = styled.div`
  display: flex;
  justify-content: flex-end; 
  flex-wrap: wrap;
  margin-right: clamp(2rem, 2vw, 4rem);
  width: 100%;
  flex-direction: row;
`

const RightContainer1 = styled.div`
  display : flex;
  justify-content: flex-end; 
  flex-wrap: wrap;
  width: 50%;
`

const RightContainer2 = styled.div`
  display : flex;
  justify-content: flex-end; 
  flex-wrap: wrap;
  flex-direction: column;
`

const LeftContianer = styled.div`
  display: flex;
  width: 100%;
`
const Components = styled.button`
  display: flex;
  color: white;
  height: 40%;
  font-size: clamp(1rem, 3vw, 6rem);
  border: none;
  background-color: #151515;
  width: 98%; 
  padding: 1rem;
  margin-left:0;
  margin-bottom: 1rem; 
  box-sizing: border-box;
  cursor: pointer;
`
const RightComponents = styled.button`
  display: flex;
  color: white;
  font-size: clamp(2rem, 3vw, 6rem);
  border: none;
  background-color: #151515;
  padding: 1rem;
  margin-left: 0;
  margin-bottom: 1rem; 
  box-sizing: border-box;
  cursor: pointer;
`

const Sidebar = () => {
    const [isLoggedIn, ] = useState(false);
    const navigate = useNavigate(); 



    return (
        <Container>
            <LeftContianer>
            <Components 
            style={{marginLeft: 'clamp(2rem, 2vw, 7rem)'}}
            onClick={()=> navigate('/')}
            >
            Back To Home</Components>
            </LeftContianer>
            <RightSide>
                <RightContainer1>
                    <Components onClick={()=> navigate('/announcement')}>Announcement</Components>
                    <Components onClick={()=> navigate('/info')}>Info.</Components>
                </RightContainer1>
                <RightContainer2>
                    <RightComponents onClick={()=> navigate('/archive')}>Archive</RightComponents>
                    <RightComponents
                    onClick={() => {
                        if (isLoggedIn) {
                          navigate('/mypage');
                        } else {
                          navigate('/login'); 
                        }
                      }}
                      >{isLoggedIn ? 'My Page' : 'Login'}</RightComponents>
                </RightContainer2>
            </RightSide>
        </Container>
    );
};


export default Sidebar;