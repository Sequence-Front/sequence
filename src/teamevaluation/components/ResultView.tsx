import React from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa'; // 체크 아이콘용 라이브러리

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

const StatusCircle = styled.div<{ status: string }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ status }) => (status === '평가완료' ? '#2C2C2C' : '#FFFFFF')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled(FaCheck)`
  color: white;
  font-size: 24px;
`;

interface ResultViewProps {
  members: Array<{
    id: number;
    name: string;
    role: string;
    status: string;
  }>;
}

const ResultView: React.FC<ResultViewProps> = ({ members }) => {
  console.log("members", members);
  return (
    <ResultContainer>
      <Logo src="/image/LogoS.png" alt="Logo" />
      <ResultTitle>프로젝트 등록 완료</ResultTitle>
      <ResultText>
        모든 팀원들이 평가를 완료하면 프로젝트가 등록됩니다.
      </ResultText>
      <MemberList>
        {members.map(member => (
          <MemberItem key={member.id}>
            <StatusCircle status={member.status}>
              {member.status === '평가완료' && <CheckIcon style={{color: "#E32929"}} />}
            </StatusCircle>
            <MemberName>{member.name}</MemberName>
            <MemberRole>{member.role}</MemberRole>
          </MemberItem>
        ))}
      </MemberList>
    </ResultContainer>
  );
};

export default ResultView;
