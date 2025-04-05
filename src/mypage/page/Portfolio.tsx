import React, { useState } from 'react';
import { PortfolioContainer } from '../styles/Portfolio.styles';
import ProjectCard from '../component/ProjectCard';
import Pagination from '../../asset/component/Pagination';

interface PortfolioProps {
  portfolioData: {
    archives: Array<{
      id: number;
      writerNickname: string;
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      role: string;
      image?: string;
    }>;
    totalPages: number;
  };
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolioData }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const formatArchiveToProject = (archive: any) => ({
    id: archive.id,
    title: archive.title,
    period: `${new Date(archive.startDate).getFullYear()}.${String(new Date(archive.startDate).getMonth() + 1).padStart(2, '0')} - ${new Date(archive.endDate).getFullYear()}.${String(new Date(archive.endDate).getMonth() + 1).padStart(2, '0')}`,
    role: archive.role || '역할 미지정',
    image: archive.image || 'default-image-url',
    devComplete: false, // API에서 제공되지 않는 정보는 기본값 설정
    startupState: false
  });

  return (
    <>
      <PortfolioContainer>
        {portfolioData.archives.map((archive) => (
          <ProjectCard 
            key={archive.id} 
            project={formatArchiveToProject(archive)}
          />
        ))}
      </PortfolioContainer>
      {portfolioData.archives.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={portfolioData.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default Portfolio;
