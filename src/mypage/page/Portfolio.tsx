import React, { useState } from 'react';
import { PortfolioContainer } from '../styles/Portfolio.styles';
import ProjectCard from '../component/ProjectCard';
import { ProjectType } from '../types/portfolio.types';
import { dummyData } from '../data/portfolioData';

const Portfolio = () => {
  const [projects, setProjects] = useState<ProjectType[]>(dummyData);

  return (
    <PortfolioContainer>
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </PortfolioContainer>
  );
};

export default Portfolio;
