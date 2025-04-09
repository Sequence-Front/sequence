import React from 'react';
import styled from 'styled-components';
import { MyActivityPost } from './MyActivityPost';

const Section = styled.div`
  margin-bottom: clamp(2rem, 5vw, 3rem); 
`;

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
`;

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ProjectSectionProps {
  posts: Array<{
    title: string;
    articleId: number;
    createdDate: string;
    numberOfComments: number;
  }>;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ posts }) => {
  return (
    <Section>
      <Header>프로젝트</Header>
      <PostListContainer>
        {posts.map((post) => (
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
    </Section>
  );
};

export { ProjectSection };