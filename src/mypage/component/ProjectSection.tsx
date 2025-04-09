import React from 'react';
import styled from 'styled-components';
import { MyActivityPost } from './MyActivityPost';

const Section = styled.div`
  margin-bottom: clamp(2rem, 5vw, 3rem); 
  margin: 0 auto;
  width: 95%;
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