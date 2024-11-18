import React, { useState } from 'react';
import styled from 'styled-components';
import { MyActivityPost, PostProps} from '../component/MyActivityPost';


const dummyData: PostProps[] = [
  { id: 1, status: '모집 중', title: '성장과 도전! 공모전에서 함께 할 팀원을 구합니다.', date: '24.08.08.', comments: 24 },
  { id: 2, status: '모집 완료', title: '성장과 도전! 공모전에서 함께 할 팀원을 구합니다.', date: '24.08.08.', comments: 12 },
  { id: 3, status: '모집 완료', title: '성장과 도전! 공모전에서 함께 할 팀원을 구합니다.', date: '24.08.08.', comments: 24 },
  { id: 4, status: '모집 중', title: '성장과 도전! 공모전에서 함께 할 팀원을 구합니다.', date: '24.08.08.', comments: 12 },
  { id: 5, status: '모집 완료', title: '성장과 도전! 공모전에서 함께 할 팀원을 구합니다.', date: '24.08.08.', comments: 24 },
];

const Container = styled.div`
  width: 100%;
  color: #fff;
  font-family: 'Noto Sans';
`

const Section = styled.div`
  margin-bottom: 40px;
`

const Header = styled.div`
  display: flex;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  align-items: center;
  gap: 1.5rem;
  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #757575;
  }
`

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  
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

const MyActivity = () => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleToggle = () => {
    setShowAll((prev) => !prev);
  };

  const sortedData = [...dummyData].sort((a, b) => {
    if (a.status === '모집 중' && b.status === '모집 완료') return -1;
    if (a.status === '모집 완료' && b.status === '모집 중') return 1;
    return 0;
  });

  const visibleData = showAll ? sortedData : sortedData.slice(0, 3);

  return (
    <Container>
      <Section>
        <Header>내가 쓴 글</Header>
        <PostListContainer>
          {visibleData.map((post) => (
            <MyActivityPost
              key={post.id}
              id={post.id}
              status={post.status}
              title={post.title}
              date={post.date}
              comments={post.comments}
            />
          ))}
        </PostListContainer>
        <ButtonWrapper>
          <Button onClick={handleToggle}>
            {showAll ? '접기' : '더보기'} <div>→</div>
          </Button>
        </ButtonWrapper>
      </Section>

      <Section>
        <Header>북마크한 글</Header>
        <PostListContainer>
          {visibleData.map((post) => (
            <MyActivityPost
              key={post.id}
              id={post.id}
              status={post.status}
              title={post.title}
              date={post.date}
              comments={post.comments}
            />
          ))}
        </PostListContainer>
        <ButtonWrapper>
          <Button onClick={handleToggle}>
            {showAll ? '접기' : '더보기'} <div>→</div>
          </Button>
        </ButtonWrapper>
      </Section>
    </Container>
  );
};

export default MyActivity;
