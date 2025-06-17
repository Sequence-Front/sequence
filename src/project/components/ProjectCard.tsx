import React from 'react';
import styled from 'styled-components';
import { Project } from '../data/dummyProjects';
import { useNavigate } from 'react-router-dom';

const TypeTag = styled.span`
  background: transparent;
  border: 1px solid #FFFFFF;
  color: white;
  padding: 0.1rem 0.3rem;
  border-radius: 20px;
  font-size: 0.8rem;
  line-height: 1.6;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
`;

const Title = styled.div`
  margin: 0;
  font-size: 1.6rem;
  color: white;
  margin-bottom: 16px;
  line-height: 1.4;
  word-break: break-all;
  transition: color 0.2s ease-in-out;
`;

const Card = styled.div`
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 350px;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    max-width: 320px;
  }
  @media (max-width: 900px) {
    max-width: 100%;
  }
  @media (max-width: 600px) {
    max-width: 100%;
    min-width: 0;
  }
  
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
  flex-wrap: wrap;
  align-items: center;
  max-width: 100%;

  @media (max-width: 1200px) {
    gap: 6px;
  }
  @media (max-width: 900px) {
    gap: 4px;
  }
  @media (max-width: 600px) {
    gap: 2px;
  }
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

  function formatDate(dateString: string) {
    const [year, month, day] = dateString.split("-");
    return `${year.slice(2)}.${month}.${day}`;
  }

  return (
    <Card onClick={() => {navigate(`/projectdetail/${project.id}`)}}>
      <TypeTagsContainer>
        {(project.roles || []).map((role, index) => (
          <TypeTag key={index}>{role}</TypeTag>
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
        <span>{formatDate(project.date)}</span>
      </MetaInfo>
    </Card>
  );
};

export default ProjectCard; 