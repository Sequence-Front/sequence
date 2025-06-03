import React from 'react';
import styled from 'styled-components';
import { Project } from '../data/dummyProjects';
import { useNavigate } from 'react-router-dom';

const TypeTag = styled.span`
  background: transparent;
  border: 1px solid #FFFFFF;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
`;

const Title = styled.div`
  margin: 0;
  font-size: 1.2rem;
  color: white;
  margin-bottom: 16px;
  line-height: 1.4;
  word-break: break-all;
  transition: color 0.2s ease-in-out;
`;

const Card = styled.div`
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    ${Title} {
      color: #E32929;
    }
    
    ${TypeTag} {
      background: #E32929;
      border-color: #E32929;
    }
  }
`;

const TypeTagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;



const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #888;
  font-size: 1rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthorAvatar = styled.div`
  width: clamp(24px, 2vw, 30px);
  height: clamp(24px, 2vw, 30px);
  border-radius: 50%;
  background: #333;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface ProjectCardProps {
  project: Project;
  searchTerm: string;
}

const HighlightedText = styled.span`
  color: #E32929;
`;

const ProjectCard: React.FC<ProjectCardProps> = ({ project, searchTerm }) => {
  const navigate = useNavigate();
  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? 
        <HighlightedText key={index}>{part}</HighlightedText> : part
    );
  };

  return (
    <Card onClick={() => {navigate(`/projectdetail/${project.id}`)}}>
      <TypeTagsContainer>
        {project.type.map((t, index) => (
          <TypeTag key={index}>{t}</TypeTag>
        ))}
      </TypeTagsContainer>
      <Title>{highlightText(project.title)}</Title>
      <MetaInfo>
        <AuthorInfo>
          <AuthorAvatar>
            {/*이미지 추가*/}
          </AuthorAvatar>
          <span>{highlightText(project.author)}</span>
        </AuthorInfo>
        <span>{project.date}</span>
      </MetaInfo>
    </Card>
  );
};

export default ProjectCard; 