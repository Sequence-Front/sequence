// 2024-12-08 박승균
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { AiOutlinePlus } from "react-icons/ai";
import Header from '../asset/component/Header';
import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import ProjectCard from './components/ProjectCard';
import Pagination from '../asset/component/Pagination';
import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from '../asset/component/ScrollToTopButton';
import { getProjects, searchProjects, filterProjects } from '../api/project';
import { Project } from './models/Project';

const Container = styled.div`
  padding: clamp(1rem, 3vw, 2rem);
  color: white;
  width: 80%;
  margin: 0 auto;
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

const NavItem = styled.a<{ active?: boolean }>`
  color: ${props => props.active ? '#white' : '#757575'};
  text-decoration: none;
  cursor: pointer;
`;

const TagContainer = styled.div`
  padding: 1rem 0;
  position: relative;
  margin-bottom: 2rem;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  border-bottom: 1px solid #616161;
  padding-bottom: 1rem;
  width: calc(100% - 200px);
`;

const Tag = styled.span<{ active?: boolean }>`
  background: ${props => props.active ? 'none' : 'transparent'};
  border: 2px solid ${props => props.active ? '#757575' : 'white'};
  color: ${props => props.active ? '#757575' : 'white'};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
`;

const SelectedTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const SelectedTag = styled.span`
  background: #E51D1D;
  color: #212121;
  padding: 0.4rem 0.7rem;
  border-radius: 20px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
  
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

const TotalProjects = styled.div`
  position: absolute;
  right: 0;
  top: 1rem;
  font-size: clamp(1rem, 1.2vw, 1.5rem);
`;

type TagCategory = '분야' | '기간' | '역할' | '필요스킬' | '회의' | '프로젝트단계';

const tagOptions: Record<TagCategory, string[]> = {
  분야: ['대회', '창업', '대외활동', '경험', '스터디'],
  기간: ['1개월 이하', '1개월 ~ 3개월', '3개월 ~ 6개월', '6개월 ~ 1년', '1년 이상'],
  역할: ['Front-end', 'Back-end', 'UXUI Design', 'BX Design', 'PM'],
  필요스킬: ['Figma', 'Adobe Illustration', 'Adobe Photoshop', 'MidJourney', 'Tool'],
  회의: ['오프라인', '온라인', '병행'],
  프로젝트단계: ['시작 전', '기획 중', '디자인 중', '개발 중', '창업 중']
};

const ProjectPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //모든 프로젝트 조회
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await getProjects();
        const projectList = response.data.map((item: any) => new Project(
          item.id,
          item.title,
          item.writer,
          item.createdDate,
          item.roles,
          [] 
        ));
        setProjects(projectList);
      } catch (error) {
        console.error('프로젝트 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  //검색어 필터링
  useEffect(() => {
    const fetchFilteredProjects = async () => {
      setIsLoading(true);
      try {
        let response;
        if (searchTerm) {
          response = await searchProjects(searchTerm);
        } else {
          response = await getProjects();
        }
        const projectList = response.data.map((item: any) => new Project(
          item.id,
          item.title,
          item.writer,
          item.createdDate,
          item.roles,
          []
        ));
        setProjects(projectList);
      } catch (error) {
        console.error('프로젝트 검색 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredProjects();
  }, [searchTerm]);

  //키워드 필터링
  useEffect(() => {
    const fetchFilteredProjects = async () => {
      if (selectedTags.length === 0) return;
      
      setIsLoading(true);
      try {
        const filters = {
          category: selectedTags.find(tag => tagOptions.분야.includes(tag)),
          periodKey: selectedTags.find(tag => tagOptions.기간.includes(tag)),
          roles: selectedTags.find(tag => tagOptions.역할.includes(tag)),
          skills: selectedTags.find(tag => tagOptions.필요스킬.includes(tag)),
          meetingOption: selectedTags.find(tag => tagOptions.회의.includes(tag)),
          step: selectedTags.find(tag => tagOptions.프로젝트단계.includes(tag))
        };
        const response = await filterProjects(filters);
        const projectList = response.data.map((item: any) => new Project(
          item.id,
          item.title,
          item.writer,
          item.createdDate,
          item.roles,
          []
        ));
        setProjects(projectList);
      } catch (error) {
        console.error('프로젝트 필터링 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredProjects();
  }, [selectedTags]);

  const projectsPerPage = 12;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handleTagClick = (tag: string) => {
    setCurrentPage(1);
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const [activeCategory, setActiveCategory] = useState<TagCategory>('분야');
  const [tags, setTags] = useState(tagOptions[activeCategory]);

  const handleNavItemClick = (category: TagCategory) => {
    setActiveCategory(category);
    setTags(tagOptions[category]);
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
        <AddProjectButton onClick={() => navigate('/project/registration')}>
          프로젝트 등록하기 <AiOutlinePlus size={28}/>
        </AddProjectButton>
      </SearchBar>

      <Navigation>
        {Object.keys(tagOptions).map(category => (
          <NavItem key={category} onClick={() => handleNavItemClick(category as TagCategory)} active={activeCategory === category}>
            {category}
          </NavItem>
        ))}
      </Navigation>

      <TagContainer>
        <TagWrapper>
          {tags.map(tag => (
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

      <TotalProjects>총 {projects.length}건의 게시글</TotalProjects>

      {isLoading ? (
        <NoResults>로딩 중...</NoResults>
      ) : projects.length > 0 ? (
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
          {searchTerm ? `"${searchTerm}"에 대한 검색 결과가 없습니다.` : "프로젝트가 없습니다."}
          <br />
          다른 검색어나 필터를 시도해주세요!
        </NoResults>
      )}

      {projects.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </Container>
    <ScrollToTopButton />
    </>
  );
};

export default ProjectPage;
