import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import {
  ProjectCard as Card,
  ImageContainer,
  ProjectImage,
  StatusContainer,
  StatusBadge,
  HoverOverlay,
  PageOpenText,
  ProjectInfo,
  ProjectTitle,
  ProjectPeriod,
  ProjectRole
} from '../styles/Portfolio.styles';
import { useNavigate } from 'react-router-dom';

interface ProjectType {
  id: number;
  title: string;
  period: string;
  role: string;
  image: string;
  devComplete?: boolean;
  startupState?: boolean;
}

interface ProjectCardProps {
  project: ProjectType;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => { navigate(`/archivedetail/${project.id}`) }}>
      <ImageContainer>
        <ProjectImage src={project.image} alt={project.title} />
        <StatusContainer>
          {project.devComplete && <StatusBadge>개발완료</StatusBadge>}
          {project.startupState && <StatusBadge>창업중</StatusBadge>}
        </StatusContainer>
        <HoverOverlay className="hover-overlay">
          <StatusContainer>
            {project.devComplete && <StatusBadge className="hover">개발완료</StatusBadge>}
            {project.startupState && <StatusBadge className="hover">창업중</StatusBadge>}
          </StatusContainer>
          <PageOpenText>
            <span>페이지 열기</span>
            <FaArrowRight />
          </PageOpenText>
        </HoverOverlay>
      </ImageContainer>
      <ProjectInfo>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectPeriod>프로젝트 기간 | {project.period}</ProjectPeriod>
        <ProjectRole>참여직무 | {project.role}</ProjectRole>
      </ProjectInfo>
    </Card>
  );
};

export default ProjectCard; 