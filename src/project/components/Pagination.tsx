import React from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 5rem;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  color: ${props => props.active ? '#ffffff' : '#888'};
  cursor: pointer;
  font-size: 1rem;
  
  &:disabled {
    cursor: default;
    color: #444;
  }
`;

const ArrowButton = styled(PageButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 1.2rem;
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // 현재 페이지 기준으로 보여줄 페이지 번호들 계산
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // 끝부분에서 5개를 맞추기 위한 조정
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <ArrowButton 
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <MdKeyboardDoubleArrowLeft color='#E32929'/>
      </ArrowButton>
      
      <ArrowButton 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdKeyboardArrowLeft color='#E32929'/>
      </ArrowButton>

      {getPageNumbers().map(number => (
        <PageButton
          key={number}
          active={currentPage === number}
          onClick={() => onPageChange(number)}
        >
          {number}
        </PageButton>
      ))}

      <ArrowButton 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdKeyboardArrowRight color='#E32929'/>
      </ArrowButton>
      
      <ArrowButton 
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <MdKeyboardDoubleArrowRight color='#E32929'/>
      </ArrowButton>
    </PaginationContainer>
  );
};

export default Pagination; 