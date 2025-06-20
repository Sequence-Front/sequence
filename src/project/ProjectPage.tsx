// 2024-12-08 박승균
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { AiOutlinePlus } from "react-icons/ai";
import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import ProjectCard from './components/ProjectCard';
import Pagination from '../asset/component/Pagination';
import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from '../asset/component/ScrollToTopButton';
import { getProjects, searchProjects } from '../api/project';
import { Project } from './models/Project';

const Container = styled.div`
  color: white;
  width: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  width: 1280px;
  flex-direction: column;
  margin: 0 auto;
  margin-top : 4rem;

  @media (max-width: 1280px) {
    width: 80%;
  }

  @media (max-width: 1000px) {
    width: 80%;
  } 

  @media (max-width: 700px) {
    width: 80%;
  }
`
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
  font-size: 1rem;
  
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
  font-size: 1.2rem;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid #616161;
  border-top: 1px solid #616161;
  padding: 2rem 0;
`;

const NavItem = styled.div<{ active?: boolean }>`
  color: ${props => props.active ? '#white' : '#757575'};
  text-decoration: none;
  cursor: pointer;
  margin: 0px 50px;
`;

const TagContainer = styled.div`
  padding: 1rem 0;
  position: relative;
  margin-bottom: 1rem;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  border-bottom: 1px solid #616161;
  padding-bottom: 1rem;
  width: 100%;
`;

const Tag = styled.span<{ active?: boolean }>`
  background: ${props => props.active ? 'none' : 'transparent'};
  border: 1px solid ${props => props.active ? '#757575' : 'white'};
  color: ${props => props.active ? '#757575' : 'white'};
  padding: 0.1rem 0.3rem;
  border-radius: 20px;
  font-size: 0.8rem;
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
  padding: 0.1rem 0.3rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
  
  &::after {
    content: 'X';
    font-size: 0.8rem;
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
  font-size: 1rem;
`;

const TotalProjects = styled.div`
  position: absolute;
  right: 0;
  top: 1rem;
  font-size: 1rem;
`;

type TagCategory = '분야' | '기간' | '역할' | '필요스킬' | '회의' | '프로젝트단계';

const tagOptions: Record<TagCategory, string[]> = {
  분야: ['대회', '창업', '대외활동', '프로젝트', '스터디'],
  기간: ['ONE_MONTH_LESS', 'ONE_TO_THREE_MONTH', 'THREE_TO_SIX_MONTH', 'SIX_TO_ONE_YEAR', 'OVER_ONE_YEAR'],
  역할: ['백엔드', '프론트', '디자이너', 'PM'],
  필요스킬: ['figma', 'spring', 'docker', 'Adobe Photoshop', 'Adobe Illustrator', 'MidJourney', 'Tool'],
  회의: ['오프라인', '온라인', '병행'],
  프로젝트단계: ['BEFORE_START', 'PLANNING', 'DESIGNING', 'DEVELOPING', 'IN_BUSINESS']
};

// 기간 표시를 위한 매핑 객체
const periodMapping = {
  'ONE_MONTH_LESS': '1개월 이하',
  'ONE_TO_THREE_MONTH': '1개월 ~ 3개월',
  'THREE_TO_SIX_MONTH': '3개월 ~ 6개월',
  'SIX_TO_ONE_YEAR': '6개월 ~ 1년',
  'OVER_ONE_YEAR': '1년 이상'
};

// 프로젝트 단계 매핑
const stepMapping = {
  'BEFORE_START' : '개발 전',
  'PLANNING': '기획 단계',
  'DESIGNING': '디자인 단계',
  'DEVELOPING': '개발 단계',
  'IN_BUSINESS': '사업 단계'
};

// 기간 필터 매핑 (API 요청용)
const periodFilterMapping = {
  'ONE_MONTH_LESS': '1개월 이하',
  'ONE_TO_THREE_MONTH': '1개월 ~ 3개월',
  'THREE_TO_SIX_MONTH': '3개월 ~ 6개월',
  'SIX_TO_ONE_YEAR': '6개월 ~ 1년',
  'OVER_ONE_YEAR': '1년 이상'
};

const ProjectPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  //모든 프로젝트 조회
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await getProjects(currentPage);
        const projectList = response.data.projects.map((item: any) => new Project(
          item.id,
          item.title,
          item.writer,
          item.createdDate,
          [],
          item.roles,
        ));
        setProjects(projectList);
        setTotalPages(response.data.totalPages);
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
          // 검색어가 있을 때는 검색 API만 사용
          response = await searchProjects(searchTerm);
          if (response && response.data && response.data.projects) {
            const projectList = response.data.projects.map((item: any) => new Project(
              item.id,
              item.title,
              item.writer,
              item.createdDate,
              [],
              item.roles,
            ));
            setProjects(projectList);
            setTotalPages(response.data.totalPages || 1);
          } else {
            setProjects([]);
            setTotalPages(1);
          }
        } else {
          // 검색어가 없을 때만 필터링 적용
          const filters = {
            category: selectedTags.find(tag => tagOptions.분야.includes(tag)),
            periodKey: selectedTags.find(tag => tagOptions.기간.includes(tag)) 
              ? periodFilterMapping[selectedTags.find(tag => tagOptions.기간.includes(tag)) as keyof typeof periodFilterMapping] 
              : undefined,
            roles: selectedTags.find(tag => tagOptions.역할.includes(tag)),
            skills: selectedTags.find(tag => tagOptions.필요스킬.includes(tag)),
            meetingOption: selectedTags.find(tag => tagOptions.회의.includes(tag)),
            step: selectedTags.find(tag => tagOptions.프로젝트단계.includes(tag))
          };
          
          response = await getProjects(filters, currentPage - 1);
          if (response.data && response.data.projects) {
            const projectList = response.data.projects.map((item: any) => new Project(
              item.id,
              item.title,
              item.writer,
              item.createdDate,
              [],
              item.roles,
            ));
            setProjects(projectList);
            setTotalPages(response.data.totalPages || 1);
          } else {
            setProjects([]);
            setTotalPages(1);
          }
        }
      } catch (error) {
        console.error('프로젝트 검색 실패:', error);
        setProjects([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredProjects();
  }, [searchTerm, selectedTags, currentPage]);

  const handleTagClick = (tag: string) => {
    setCurrentPage(1);
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [activeCategory, setActiveCategory] = useState<TagCategory>('분야');
  const [tags, setTags] = useState(tagOptions[activeCategory]);

  const handleNavItemClick = (category: TagCategory) => {
    setActiveCategory(category);
    setTags(tagOptions[category]);
  };

  // 태그 표시 시 매핑된 값 사용
  const getDisplayTag = (tag: string) => {
    if (tag in periodMapping) {
      return periodMapping[tag as keyof typeof periodMapping];
    }
    if (tag in stepMapping) {
      return stepMapping[tag as keyof typeof stepMapping];
    }
    return tag;
  };

  return (
    <>
    <Container>
      <ListContainer>
      <SearchBar>
        <SearchInput 
          placeholder="프로젝트 제목을 검색해보세요!" 
          value={searchTerm}
          onChange={handleSearch}
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
              {getDisplayTag(tag)}
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
                {getDisplayTag(tag)}
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
            {projects.map((project) => (
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
          onPageChange={handlePageChange}
        />
      )}
      </ListContainer>
    </Container>
    <ScrollToTopButton />
    </>
  );
};

export default ProjectPage;
