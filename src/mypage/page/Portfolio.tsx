import React, { useState } from 'react';
import { PortfolioContainer } from '../styles/Portfolio.styles';
import ProjectCard from '../component/ProjectCard';
import Pagination from '../../asset/component/Pagination';
import { ProjectSection } from '../component/ProjectSection';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Tab = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  color: ${props => props.isSelected ? '#E32929' : '#fff'};
  font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${props => props.isSelected ? '#E32929' : 'transparent'};
`;

interface PortfolioProps {
  portfolioData: {
    archivePage: {
      content: Array<{
        id: number;
        title: string;
        thumbnail?: string;
        startDate: string;
        endDate: string;
      }>;
    };
    invitedProjects: Array<{
      projectInvitedMemberId: number;
      writer: string;
      title: string;
      inviteDate: string;
      commentCount: number;
    }>;
  };
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolioData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'project'>('portfolio');

  const formatArchiveToProject = (archive: any) => ({
    id: archive.id,
    title: archive.title,
    period: `${new Date(archive.startDate).getFullYear()}.${String(new Date(archive.startDate).getMonth() + 1).padStart(2, '0')} - ${new Date(archive.endDate).getFullYear()}.${String(new Date(archive.endDate).getMonth() + 1).padStart(2, '0')}`,
    image: archive.thumbnail || 'default-image-url',
  });

  return (
    <>
      <TabContainer>
        <Tab 
          isSelected={activeTab === 'portfolio'} 
          onClick={() => setActiveTab('portfolio')}
        >
          포트폴리오
        </Tab>
        <Tab 
          isSelected={activeTab === 'project'} 
          onClick={() => setActiveTab('project')}
        >
          프로젝트
        </Tab>
      </TabContainer>

      {activeTab === 'portfolio' ? (
        <>
          <PortfolioContainer>
            {portfolioData.archivePage.content.map((archive) => (
              <ProjectCard 
                key={archive.id} 
                project={formatArchiveToProject(archive)}
              />
            ))}
          </PortfolioContainer>
          {portfolioData.archivePage.content.length > 0 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={1}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <ProjectSection posts={portfolioData.invitedProjects.map(project => ({
          articleId: project.projectInvitedMemberId,
          title: project.title,
          createdDate: project.inviteDate,
          numberOfComments: project.commentCount
        }))} />
      )}
    </>
  );
};

export default Portfolio;
