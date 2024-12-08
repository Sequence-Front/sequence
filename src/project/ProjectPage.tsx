// 2024-12-08 박승균
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { AiOutlinePlus } from "react-icons/ai";
import Header from '../asset/component/Header';
import { dummyProjects } from './data/dummyProjects';
import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import ProjectCard from './components/ProjectCard';
import Pagination from './components/Pagination';
import { IoArrowUpOutline } from "react-icons/io5";

const Container = styled.div`
  padding: clamp(1rem, 3vw, 2rem);
  color: white;
  width: min(90%, 1400px);
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    width: 95%;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: clamp(3rem, 5vw, 5rem);
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid #616161;
  color: white;
  width: clamp(200px, 30vw, 500px);
  padding: 0.5rem;
  font-size: clamp(0.8rem, 1.2vw, 1.5rem);
  
  &:focus {
    outline: none;
    border-bottom: 1px solid #E0E0E0;
  }
`;

const SearchIcon = styled(FaSearch)`
  color: #E51D1D;
  margin-left: 0.5rem;
`;

const AddProjectButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: #E32929;
  padding: clamp(0.5rem, 1vw, 1rem) clamp(0.8rem, 1.5vw, 1rem);
  margin-left: auto;
  cursor: pointer;
  border: 1px solid #E32929;
  font-size: clamp(0.8rem, 1.2vw, 1.5rem);
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid #616161;
  border-top: 1px solid #616161;
  padding: 1rem 0;
`;

const NavItem = styled.a`
  color: white;
  text-decoration: none;
  cursor: pointer;
`;

const TagContainer = styled.div`
  padding: 1rem 0;
  position: relative;
  margin-bottom: 4rem;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  border-bottom: 1px solid #616161;
  padding-bottom: 1rem;
`;

const Tag = styled.span<{ active?: boolean }>`
  background: ${props => props.active ? '#E51D1D' : 'transparent'};
  border: 1px solid ${props => props.active ? '#E51D1D' : 'white'};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
`;

const SelectedTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
`;

const SelectedTag = styled.span`
  background: #E51D1D;
  color: white;
  padding: 0.2rem 0.7rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  
  &::after {
    content: 'X';
    font-size: 1rem;
  }
`;

const ProjectSection = styled(Box)`
  width: 100%;
  margin: 0 auto;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  color: white;
  font-size: 1.1rem;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: clamp(50px, 10vw, 90px);
  height: clamp(50px, 10vw, 90px);
  border-radius: 50%;
  background: #E32929;
  border: none;
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  
  svg {
    width: 90%;
    height: 90%;
    color: #212121;
  }
`;

const TotalProjects = styled.div`
  margin-bottom: 2rem;
  font-size: clamp(1rem, 1.2vw, 1.5rem);
`;

const ProjectPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTags]);

  const filteredProjects = dummyProjects.filter(project => {
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => project.tags.includes(tag));
    
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTags && matchesSearch;
  });

  const projectsPerPage = 12;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleTagClick = (tag: string) => {
    setCurrentPage(1);
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
    <Header headerName="Project"/>
    <Container>
      <SearchBar>
        <SearchInput 
          placeholder="프로젝트 제목을 검색해보세요!" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon />
        <AddProjectButton>
          프로젝트 등록하기 <AiOutlinePlus size={28}/>
        </AddProjectButton>
      </SearchBar>

      <Navigation>
        <NavItem>분야</NavItem>
        <NavItem>기간</NavItem>
        <NavItem>역할</NavItem>
        <NavItem>리소스</NavItem>
        <NavItem>회의</NavItem>
        <NavItem>프로젝트 단계</NavItem>
      </Navigation>

      <TagContainer>
        <TagWrapper>
          {['대회', '창업', '대외활동', '경험', '스터디'].map(tag => (
            <Tag 
              key={tag}
              active={selectedTags.includes(tag)}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Tag>
          ))}
        </TagWrapper>
        {selectedTags.length > 0 && (
          <SelectedTags>
            {selectedTags.map(tag => (
              <SelectedTag 
                key={tag}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </SelectedTag>
            ))}
          </SelectedTags>
        )}
      </TagContainer>

      <TotalProjects>총 {filteredProjects.length}건의 게시글</TotalProjects>

      {filteredProjects.length > 0 ? (
        <ProjectSection>
          <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            spacing={2}
            defaultHeight={450}
            sx={{ margin: 0 }}
          >
            {currentProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                searchTerm={searchTerm}
              />
            ))}
          </Masonry>
        </ProjectSection>
      ) : (
        <NoResults>
          "{searchTerm}"에 대한 검색 결과가 없습니다.
          <br />
          다른 단어로 검색을 시도해주세요!
        </NoResults>
      )}

      {filteredProjects.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </Container>
    <ScrollToTopButton onClick={scrollToTop}>
      <IoArrowUpOutline />
    </ScrollToTopButton>
    </>
  );
};

export default ProjectPage;
