import React, { useState } from 'react';
import styled from 'styled-components';
import { MemberSummaryComponent, GrayBar, DataItem } from '../component/MemberSummaryComponent';
import MemberEvaluationPost from '../component/MemberEvaluationPost'

const dummyData: DataItem[] = [
  { label: "시간 약속을 잘 지켜요", value: 24, profile: "https://via.placeholder.com/40", content: "시간 약속을 정말 잘 지켜요." },
  { label: "배려심이 넘쳐요", value: 12, profile: "https://via.placeholder.com/40", content: "항상 배려심 있는 태도로 임합니다." },
  { label: "꾸준히 모임에 참석해요", value: 8, profile: "https://via.placeholder.com/40", content: "모임에 꾸준히 참여해요." },
  { label: "연락에 답장이 빠른 편이에요", value: 3, profile: "https://via.placeholder.com/40", content: "연락에 답장이 매우 빨라요." },
  { label: "친절하게 대화해요", value: 18, profile: "https://via.placeholder.com/40", content: "항상 친절한 태도로 대화합니다." },
  { label: "친절하게 대화해요", value: 17, profile: "https://via.placeholder.com/40", content: "항상 친절한 태도로 대화합니다." }
];

const dummyData2 = [
  {
    name: '홍영주',
    affiliation: '홍익대학교 (세종) 디자인컨버전스학부 4학년 휴학',
    content: '이번프로젝트에서 보여준 리더십이 인상적이었어요. 덕분에 모두가 더 나은 결과를 낼 수 있었어요!',
    time: '1년 이상',
    img: 'https://via.placeholder.com/150',
  },
  {
    name: '정준용',
    affiliation: '고려대학교 컴퓨터공학과 3학년',
    content: '당신의 문제 해결 능력 덕분에 프로젝트가 순조롭게 진행될 수 있었어요. 정말 고마워요!',
    time: '6개월',
    img: 'https://via.placeholder.com/150',
  },
  {
    name: '박승균',
    affiliation: '연세대학교 경제학부 4학년',
    content: '프로젝트에서 보여준 꼼꼼함이 인상적이었어요. 덕분에 작은 실수도 놓치지 않았습니다.',
    time: '8개월',
    img: 'https://via.placeholder.com/150',
  },
];

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 5rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.6rem 1.2rem;
  background-color: transparent;
  color: #ff0000;
  border: 2px solid #ff0000;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #ff0000;
    color: #fff;
  }
`

const PostContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const TagButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`

const TagButton = styled.div`
  display: flex;
  padding: 0.4rem 1rem;
  border: 0.5px solid #D9D9D9;
  background-color: none;
  color: #D9D9D9;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
`

const MemberEvaluation = () => {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll((prev) => !prev);
  };

  const sortedData = [...dummyData].sort((a, b) => b.value - a.value);
  const displayedData = showAll ? sortedData : sortedData.slice(0, 4);
  const maxValue = Math.max(...sortedData.map((item) => item.value)) * 1.2;

  return (
    <>
    <SummaryContainer>
      {displayedData.map((item, index) => (
        <MemberSummaryComponent key={index} item={item} maxValue={maxValue} />
      ))}
      {!showAll && <GrayBar />}
      <ButtonWrapper>
        <Button onClick={handleToggle}>
          {showAll ? '접기' : '더보기'} <div>→</div>
        </Button>
      </ButtonWrapper>
    </SummaryContainer>
    <PostContainer>
      <TagButtonContainer>
      <TagButton>참여도</TagButton>
      <TagButton>시간개념..?</TagButton>
      <TagButton>커뮤니케이션</TagButton>
      </TagButtonContainer>
      {dummyData2.map((member, index) => (
          <MemberEvaluationPost key={index} member={member} />
      ))}
    </PostContainer>
    </>
  );
};

export default MemberEvaluation;
