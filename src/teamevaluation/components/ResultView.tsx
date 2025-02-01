import React from 'react';
import styled from 'styled-components';
import LogoS from '../../asset/image/LogoS.png';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
`;

const Logo = styled.img`
  width: 120px;
  margin: 8rem 0;
`;

const ResultTitle = styled.div`
  font-size: clamp(2rem, 2.5vw, 3rem);
  color: #E32929;
  margin-bottom: 1rem;
`;

const ResultText = styled.div`
  font-size: clamp(1rem, 1.2vw, 1.4rem);
  color: #FFFFFF;
  text-align: center;
`;

const MemberList = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
`;

const MemberItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const MemberName = styled.span`
  color: white;
  font-size: 16px;
`;

const MemberRole = styled.span`
  color: #ffffff;
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #ffffff;
`;

const MemberImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #2C2C2C;
`;

interface ResultViewProps {
  members: Array<{
    id: number;
    name: string;
    role: string;
    image: string;
  }>;
}

const ResultView: React.FC<ResultViewProps> = ({ members }) => {
  return (
    <ResultContainer>
      <Logo src={LogoS} alt="Logo" />
      <ResultTitle>프로젝트 등록 완료</ResultTitle>
      <ResultText>
        모든 팀원들이 평가를 완료하면 프로젝트가 등록됩니다.
      </ResultText>
      <MemberList>
        {members.map(member => (
          <MemberItem key={member.id}>
            <MemberImage src={member.image} alt={member.name} />
            <MemberName>{member.name}</MemberName>
            <MemberRole>{member.role}</MemberRole>
          </MemberItem>
        ))}
      </MemberList>
    </ResultContainer>
  );
};

export default ResultView; 