import React from 'react';
import styled from 'styled-components';
import { FaPlus, FaSearch } from 'react-icons/fa';
import Header from '../asset/component/Header';

const Container = styled.div`
  padding: 2rem;
  color: white;
  min-width: 680px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #616161;
  color: white;
  width: 300px;
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
  border: 1px solid #E51D1D;
  color: #E51D1D;
  padding: 0.5rem 1rem;
  margin-left: auto;
  cursor: pointer;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
`;

const NavItem = styled.a`
  color: white;
  text-decoration: none;
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const Tag = styled.span<{ active?: boolean }>`
  background: ${props => props.active ? '#E51D1D' : 'transparent'};
  border: 1px solid ${props => props.active ? '#E51D1D' : 'white'};
  color: ${props => props.active ? 'white' : 'white'};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
`;

const ProjectCard = styled.div`
  border: 1px solid #333;
  padding: 1rem;
  border-radius: 8px;
`;

const ProjectPage: React.FC = () => {
  return (
    <>
    <Header headerName="Project"/>
    <Container>
      <SearchBar>
        <SearchInput placeholder="프로젝트를 직접 찾아보세요!" />
        <SearchIcon />
        <AddProjectButton>
          <FaPlus /> 프로젝트 등록하기
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
        <Tag active>디자인</Tag>
        <Tag>연구</Tag>
        <Tag>데이터</Tag>
        <Tag>웹/앱</Tag>
        <Tag>스타트업</Tag>
      </TagContainer>

      <TagContainer>
        <Tag active>단기간</Tag>
        <Tag active>단기간</Tag>
        <Tag>스타트업</Tag>
        <Tag>단기간</Tag>
        <Tag>장기간</Tag>
      </TagContainer>

      <h3>총 1,000건의 게시글</h3>

      <ProjectGrid>
        {/* 프로젝트 카드들이 여기에 들어갈 예정 */}
      </ProjectGrid>
      </Container>
    </>
  );
};

export default ProjectPage;
