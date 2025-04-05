// 11-19 19:50 준용 완료
//내활동 모음집
// API: 포스트아이디, status, title, date, comments개수
import React, { useState } from 'react';
import styled from 'styled-components';
import { MyActivityPost } from '../component/MyActivityPost';

interface MyActivityProps {
  activities: {
    myArchive: {
      bookmarkedPosts: Array<{
        title: string;
        articleId: number;
        createdDate: string;
        numberOfComments: number;
      }>;
      writtenPosts: Array<{
        title: string;
        articleId: number;
        createdDate: string;
        numberOfComments: number;
      }>;
    };
    myProject: {
      bookmarkedPosts: Array<{
        title: string;
        articleId: number;
        createdDate: string;
        numberOfComments: number;
      }>;
      writtenPosts: Array<{
        title: string;
        articleId: number;
        createdDate: string;
        numberOfComments: number;
      }>;
    };
  };
}

const Section = styled.div`
  margin-bottom: clamp(2rem, 5vw, 3rem); 
`

const Header = styled.div`
  display: flex;
  margin-bottom: clamp(1.5rem, 4vw, 2rem); 
  font-size: clamp(1rem, 2.5vw, 2rem); 
  font-weight: bold;
  align-items: center;
  gap: clamp(1rem, 3vw, 1.5rem); 
  
  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #757575;
  }
`

const Container = styled.div`
  width: 100%;
  color: #fff;
  font-family: 'Noto Sans';
`

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: clamp(1rem, 3vw, 1.5rem);
`

const Button = styled.button`
  display: flex;
  align-items: center;
  margin-top: clamp(0.5rem, 1vw, 1rem);
  gap: clamp(1rem, 2.5vw, 2rem); 
  padding: clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 2vw, 1.2rem); 
  background-color: transparent;
  color: #ff0000;
  border: 2px solid #ff0000;
  font-size: clamp(1rem, 1.2vw, 1.8rem); 
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ff0000;
    color: #fff;
  }
`

const MyActivity: React.FC<MyActivityProps> = ({ activities }) => {
  const [showAllArchive, setShowAllArchive] = useState<boolean>(false);
  const [showAllProject, setShowAllProject] = useState<boolean>(false);

  const visibleArchiveWritten = showAllArchive 
    ? activities.myArchive.writtenPosts 
    : activities.myArchive.writtenPosts.slice(0, 3);
  
  const visibleArchiveBookmarked = showAllArchive 
    ? activities.myArchive.bookmarkedPosts 
    : activities.myArchive.bookmarkedPosts.slice(0, 3);
  
  const visibleProjectWritten = showAllProject 
    ? activities.myProject.writtenPosts 
    : activities.myProject.writtenPosts.slice(0, 3);
  
  const visibleProjectBookmarked = showAllProject 
    ? activities.myProject.bookmarkedPosts 
    : activities.myProject.bookmarkedPosts.slice(0, 3);

  return (
    <Container>
      <Section>
        <Header>아카이브</Header>
        <PostListContainer>
          {visibleArchiveWritten.map((post) => (
            <MyActivityPost
              key={post.articleId}
              id={post.articleId}
              title={post.title}
              createdDate={post.createdDate}
              numberOfComments={post.numberOfComments}
              type="archive"
            />
          ))}
        </PostListContainer>
        {activities.myArchive.writtenPosts.length > 3 && (
          <ButtonWrapper>
            <Button onClick={() => setShowAllArchive(!showAllArchive)}>
              {showAllArchive ? '접기' : '더보기'} <div>→</div>
            </Button>
          </ButtonWrapper>
        )}

        <Header>북마크한 아카이브</Header>
        <PostListContainer>
          {visibleArchiveBookmarked.map((post) => (
            <MyActivityPost
              key={post.articleId}
              id={post.articleId}
              title={post.title}
              createdDate={post.createdDate}
              numberOfComments={post.numberOfComments}
              type="archive"
            />
          ))}
        </PostListContainer>
        {activities.myArchive.bookmarkedPosts.length > 3 && (
          <ButtonWrapper>
            <Button onClick={() => setShowAllArchive(!showAllArchive)}>
              {showAllArchive ? '접기' : '더보기'} <div>→</div>
            </Button>
          </ButtonWrapper>
        )}
      </Section>

      <Section>
        <Header>프로젝트</Header>
        <PostListContainer>
          {visibleProjectWritten.map((post) => (
            <MyActivityPost
              key={post.articleId}
              id={post.articleId}
              title={post.title}
              createdDate={post.createdDate}
              numberOfComments={post.numberOfComments}
              type="project"
            />
          ))}
        </PostListContainer>
        {activities.myProject.writtenPosts.length > 3 && (
          <ButtonWrapper>
            <Button onClick={() => setShowAllProject(!showAllProject)}>
              {showAllProject ? '접기' : '더보기'} <div>→</div>
            </Button>
          </ButtonWrapper>
        )}

        <Header>북마크한 프로젝트</Header>
        <PostListContainer>
          {visibleProjectBookmarked.map((post) => (
            <MyActivityPost
              key={post.articleId}
              id={post.articleId}
              title={post.title}
              createdDate={post.createdDate}
              numberOfComments={post.numberOfComments}
              type="project"
            />
          ))}
        </PostListContainer>
        {activities.myProject.bookmarkedPosts.length > 3 && (
          <ButtonWrapper>
            <Button onClick={() => setShowAllProject(!showAllProject)}>
              {showAllProject ? '접기' : '더보기'} <div>→</div>
            </Button>
          </ButtonWrapper>
        )}
      </Section>
    </Container>
  );
};

export default MyActivity;
