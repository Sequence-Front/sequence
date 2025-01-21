import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../asset/component/Header';
import Pagination from '../../asset/component/Pagination';
import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from '../../asset/component/ScrollToTopButton';
import ArchiveItem from './ArchiveItem';

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
    
    // 임시 데이터 수정
    const dummyArchives = Array(23).fill(null).map((_, index) => ({
        id: index + 1,
        imageUrl: '/path/to/image.jpg',
        title: `프로젝트 ${index + 1}`,
        date: '2024.03.21'
    }));

    const itemsPerPage = 18;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dummyArchives.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(dummyArchives.length / itemsPerPage);

    const handleArchiveClick = (id: number) => {
        navigate(`/archive/${id}`);
    };
    
    return (
        <>
            <Header headerName="archive"/>
            <Container>
                <ArchiveGrid>
                    {currentItems.map((item) => (
                        <ArchiveItem 
                            key={item.id}
                            id={item.id}
                            imageUrl={item.imageUrl}
                            title={item.title}
                            date={item.date}
                            onClick={handleArchiveClick}
                        />
                    ))}
                </ArchiveGrid>
                
                {dummyArchives.length > 0 && (
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