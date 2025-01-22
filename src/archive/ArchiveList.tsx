import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../asset/component/Header';
import Pagination from '../asset/component/Pagination';
import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from '../asset/component/ScrollToTopButton';
import ArchiveItem from './component/ArchiveItem';

import { FaSearch } from 'react-icons/fa';
import { AiOutlinePlus } from "react-icons/ai";
import { archiveDummyData } from './data/archiveDummyData';


const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: clamp(3rem, 5vw, 5rem);
  margin-top: clamp(3rem, 5vw, 5rem);
  justify-content: space-between;
  width: 75%;
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2rem;
`;

const ArchiveGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin: 2rem auto;
    width: 75%;
`;

export const ProjectInfo = styled.div`
  padding: clamp(16px, 2vw, 20px) 0;
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1vw, 12px);
`;

const ArchiveList = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    
    const itemsPerPage = 18;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = archiveDummyData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(archiveDummyData.length / itemsPerPage);

    const handleArchiveClick = (id: number) => {
        navigate(`/archive/${id}`);
    };
    
    return (
        <>
            <Header headerName="archive"/>
            
            <Container>
                <SearchBar>
                    <SearchInput 
                        placeholder="프로젝트 제목을 검색해보세요!" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchIcon />
                    <AddProjectButton onClick={() => navigate('/project/registration')}>
                    아카이브 프로젝트 등록하기 <AiOutlinePlus size={28}/>
                    </AddProjectButton>
                </SearchBar>
                <div style={{width: '75%'}}>
                    총 {archiveDummyData.length}건의 게시글
                </div>
                <ArchiveGrid>
                    {currentItems.map((item) => (
                        <ArchiveItem 
                            id={item.id}
                            item={item}
                        />
                    ))}
                </ArchiveGrid>
                
                {archiveDummyData.length > 0 && (
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

export default ArchiveList;