import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  margin-top : 4rem;
  justify-content: space-between;
  width: 100%;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid #616161;
  color: white;
  width: 500px;
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
  padding: 0.5rem 1rem;
  margin-left: auto;
  cursor: pointer;
  border: 1px solid #E32929;
  font-size: 1.2rem;
`;

const Container = styled.div`
  color: white;
  width: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  width: 1280px;
  flex-direction: column;
  margin: 0 auto;

  @media (max-width: 512px) {
    width: 80%;
  }
`;

const ArchiveGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin: 2rem auto;
    width: 1280px;

    @media (max-width: 512px) {
        grid-template-columns: 1fr;
        width: 80%;
        padding: 0 1rem;
        box-sizing: border-box;
    }
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
  font-size: 1rem;
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
            <Container>
                <ListContainer>
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
                <div style={{width: '1280px'}}>
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
                </ListContainer>
            </Container>
            
            <ScrollToTopButton />
        </>
    );
};

export default ArchiveList;