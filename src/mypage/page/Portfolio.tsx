import React, { useState } from 'react';
import { PortfolioContainer } from '../styles/Portfolio.styles';
import ProjectCard from '../component/ProjectCard';
import { ProjectType } from '../types/portfolio.types';
import { dummyData } from '../data/portfolioData';
import Pagination from '../../asset/component/Pagination';

const Portfolio = () => {
  const [projects, setProjects] = useState<ProjectType[]>(dummyData);
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 12;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <>
    <PortfolioContainer>
      {currentProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}

      
    </PortfolioContainer>
    {projects.length > 0 && (
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    )}
    </>
  );
};

export default Portfolio;
