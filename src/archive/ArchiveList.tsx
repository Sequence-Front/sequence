import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../asset/component/Header';
import Pagination from '../asset/component/Pagination';
import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from '../asset/component/ScrollToTopButton';
import ArchiveItem from './component/ArchiveItem';
import { FaSearch } from 'react-icons/fa';
import { AiOutlinePlus } from "react-icons/ai";
import { getArchives, searchArchives } from '../api/archive';
import { Archive } from './types/archive';


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

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  color: white;
  font-size: 1.1rem;
`;

const ArchiveList = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [archives, setArchives] = useState<Archive[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArchives = async () => {
            setIsLoading(true);
            try {
                if (searchTerm) {
                    const response = await searchArchives(searchTerm, currentPage);
                    setArchives(response.data.archives);
                    setTotalPages(response.data.totalPages);
                } else {
                    const response = await getArchives(currentPage);
                    setArchives(response.data.archives);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('데이터 조회 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArchives();
    }, [currentPage, searchTerm]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <>
            <Header headerName="archive"/>
            
            <Container>
                <SearchBar>
                    <SearchInput 
                        placeholder="프로젝트 제목을 검색해보세요!" 
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <SearchIcon />
                    <AddProjectButton onClick={() => navigate('/archive/registration')}>
                        아카이브 프로젝트 등록하기 <AiOutlinePlus size={28}/>
                    </AddProjectButton>
                </SearchBar>
                <div style={{width: '75%'}}>
                    총 {archives.length}건의 게시글
                </div>
                
                {isLoading ? (
                    <div>로딩 중...</div>
                ) : archives.length > 0 ? (
                    <ArchiveGrid>
                        {archives.map((item) => (
                            <ArchiveItem 
                                key={item.id}
                                id={item.id}
                                item={item}
                            />
                        ))}
                    </ArchiveGrid>
                ) : (
                    <NoResults>
                        "{searchTerm}"에 대한 검색 결과가 없습니다.
                        <br />
                        다른 단어로 검색을 시도해주세요!
                    </NoResults>
                )}
                
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </Container>
            
            <ScrollToTopButton />
        </>
    );
};

export default ArchiveList;