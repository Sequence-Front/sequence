import React from 'react';
import styled from 'styled-components';
import BackgroundImage from '../../asset/image/WhoMadeImage.png';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: url(${BackgroundImage}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const Title = styled.h2`
  font-family: 'Alike', serif;
  font-size: 4rem;
  color: white;
  margin-bottom: 4rem;
`;

const TeamSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamTitle = styled.h3`
  font-family: 'Alike', serif;
  font-size: 2rem;
  color: white;
  margin-bottom: 2rem;
  width: 100%;
  text-align: center;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
`;

const MemberItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 1rem;
  align-items: center;
`;

const Role = styled.span`
  font-family: 'Noto Sans', sans-serif;
  font-size: 1rem;
  color: #888;
  font-style: italic;
  text-align: right;
`;

const Name = styled.span`
  font-family: 'Noto Sans', sans-serif;
  font-size: 1.2rem;
  color: white;
  text-align: left;
`;

interface TeamMember {
  role: string;
  name: string;
}

interface TeamProps {
  title: string;
  members: TeamMember[];
}

// 개별 멤버 컴포넌트
const Member: React.FC<TeamMember> = ({ role, name }) => {
  return (
    <MemberItem>
      <Role>{role}</Role>
      <Name>{name}</Name>
    </MemberItem>
  );
};

// 팀 섹션 컴포넌트
const Team: React.FC<TeamProps> = ({ title, members }) => {
  return (
    <TeamSection>
      <TeamTitle>{title}</TeamTitle>
      <MemberList>
        {members.map((member, index) => (
          <Member key={index} {...member} />
        ))}
      </MemberList>
    </TeamSection>
  );
};

function WhoMade() {
    const designTeam: TeamMember[] = [
        { role: 'Designer', name: 'Hong Yeong-ju' },
        { role: '', name: 'Park So-hyun' },
    ];

    const devTeam: TeamMember[] = [
        { role: 'Frontend', name: 'Choi Bo-kyung' },
        { role: '', name: 'Jung Joon-yong' },
        { role: '', name: 'Kim Na-kyung' },
        { role: '', name: 'Lee Yun-seo' },
        { role: '', name: 'Park Seung-gyun' },
        { role: 'Backend', name: 'Ha Heon-chan' },
        { role: '', name: 'Jo Seung-bin' },
        { role: '', name: 'Kim Dae-jeon' },
        { role: '', name: 'Kim Min-ji' },
        { role: '', name: 'Na Gang-min' },
        { role: '', name: 'Oh Jeong-bin' },
        { role: '', name: 'Park Kyu-won' },
        { role: '', name: 'Park So-yeon' },
        { role: '', name: 'Kim Jae-hwan' },
    ];

    return (
        <Container>
            <Content>
                <Title>Who Made</Title>
                <Team title="Design Team" members={designTeam} />
                <br/><br/><br/>
                <Team title="Dev Team" members={devTeam} />
            </Content>
        </Container>
    );
}

export default WhoMade;