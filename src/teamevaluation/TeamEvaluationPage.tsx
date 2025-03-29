import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../asset/component/Header';
import BackButton from '../common/components/BackButton';
import { AiOutlineArrowRight } from 'react-icons/ai';
import MemberCard from './components/MemberCard';
import ResultView from './components/ResultView';
import {getEvaluation} from '../api/evaluation';

const Container = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  width: 75%;
`;

const Title = styled.div`
  display: flex;
  font-size: clamp(3rem, 3.5vw, 4rem);
  font-weight: bold;
  color: #FFFFFF;
  margin: clamp(5rem, 7vw, 9rem) 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: 1px solid #e32929;
  background-color: transparent;
  color: #e32929;
  font-family: 'SUIT', sans-serif;
  font-size: clamp(0.8rem, 1.5vw, 1.5rem);
  font-weight: 500;
  cursor: pointer;
  outline: none;
  margin: 1rem auto;
  width: 300px;

  &:hover {
    background-color: #e32929;
    color: #151515;
  }
`;

const ButtonText = styled.span`
  font-size: 1.1rem;
  margin-right: 1rem;
`;

const ErrorMessage = styled.div`
  color: #E32929;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const Description = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5rem;
`;


const TeamEvaluationPage = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');
  const [evaluations, setEvaluations] = useState<{[key: number]: {
    period: string;
    comment: string;
    keywords: string[];
  }}>({});

  const { archiveId } = useParams();
  const [evaluatedMembers, setEvaluatedMembers] = useState<any[]>([]);

  // 임시 멤버 데이터
  const members = [
    { id: 1, name: '홍길동', role: 'PM', image: '/profile1.jpg' },
    { id: 2, name: '김철수', role: 'Back-end', image: '/profile2.jpg' },
    { id: 3, name: '이영희', role: 'Front-end', image: '/profile3.jpg' },
    { id: 4, name: '박지민', role: 'UXUI Design', image: '/profile4.jpg' },
    { id: 5, name: '최영희', role: 'UXUI Design', image: '/profile5.jpg' }
  ];

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        if (!archiveId) return;
        const response = await getEvaluation(archiveId);
        console.log("받은 평가 데이터:", response.data);

        if (response.data && response.data.data.length > 0) {
          const evaluated = response.data.data[0].evaluated;
          console.log(evaluated);
          setEvaluatedMembers(
            evaluated.map((member: any, idx: number) => ({
              id: idx + 1,
              name: member.nickname,
              role: member.roles.join(', '),
              image: member.profileImg,
            }))
          );
        }
      } catch (error) {
        console.error("평가 데이터를 불러오는 중 오류 발생:", error);
        setError("평가 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchEvaluations();
  }, [archiveId]);

const handleEvaluationChange = (memberId: number, field: string, value: any) => {
  setEvaluations(prev => ({
    ...prev,
    [memberId]: {
      ...prev[memberId],
      [field]: value
    }
  }));
};

  const validateEvaluations = () => {
    for (const member of evaluatedMembers) {
      const evaluation = evaluations[member.id];
      if (!evaluation) {
        setError(`${member.name}의 평가를 완료해주세요.`);
        return false;
      }

      if (!evaluation.period || evaluation.period.length < 21) {
        setError(`${member.name}의 함께 한 기간을 입력해주세요.`);
        return false;
      }

      if (!evaluation.comment || evaluation.comment.trim() === '') {
        setError(`${member.name}의 한줄평을 입력해주세요.`);
        return false;
      }

      if (!evaluation.keywords || evaluation.keywords.length === 0) {
        setError(`${member.name}의 키워드를 1개 이상 선택해주세요.`);
        return false;
      }
    }
    return true;
  };

  const handleRegisterClick = () => {
    setError('');
    if (validateEvaluations()) {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <>
        <Header headerName="팀 평가" />
        <Container>
          <ResultView members={members} />
        </Container>
      </>
    );
  }

  return (
    <>
      <Header headerName="팀 평가" />
      <Container>
        <Title>
          <BackButton />
          <div style={{margin: '0 auto'}}>팀원평가</div>
        </Title>

        {evaluatedMembers.map(member => (
          <MemberCard
            key={member.id}
            member={member}
            isSelected={selectedMember === member.id}
            evaluation={evaluations[member.id] || { period: '', comment: '', keywords: [] }}
            onSelect={setSelectedMember}
            onEvaluationChange={handleEvaluationChange}
          />
        ))}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonContainer onClick={handleRegisterClick}>
          <ButtonText>프로젝트 등록하기</ButtonText>
          <AiOutlineArrowRight style={{ fontSize: "30px", strokeWidth: "0.5px" }} />
        </ButtonContainer>
        <Description>
          팀원들이 모두 평가를 진행해야 프로젝트가 등록됩니다.
        </Description>
        
      </Container>
    </>
  );
};

export default TeamEvaluationPage;