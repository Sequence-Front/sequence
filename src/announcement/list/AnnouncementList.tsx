import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import Header from '../../asset/component/Header';
import { dummyAnnouncements } from '../data/dummyAnnouncements';
import AnnouncementCard from '../components/AnnouncementCard';
import Pagination from '../../asset/component/Pagination';
import ScrollToTopButton from '../../asset/component/ScrollToTopButton';
import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';

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

const TotalAnnouncements = styled.div`
  margin-bottom: 2rem;
  font-size: clamp(1rem, 1.2vw, 1.5rem);
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  color: white;
  font-size: 1.1rem;
`;

const AnnouncementSection = styled(Box)`
  width: 100%;
  margin: 0 auto;
`;

const AnnouncementList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAnnouncements = dummyAnnouncements.filter(announcement => {
    return announcement.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const announcementsPerPage = 12;
  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement
  );
  const totalPages = Math.ceil(filteredAnnouncements.length / announcementsPerPage);

  return (
    <>
      <Header headerName="공지사항" />
      <Container>
        <SearchBar>
          <SearchInput 
            placeholder="공지사항 제목을 검색해보세요!" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon />
        </SearchBar>

        <TotalAnnouncements>
          총 {filteredAnnouncements.length}건의 게시글
        </TotalAnnouncements>

        {filteredAnnouncements.length > 0 ? (
          <AnnouncementSection>
            <Masonry
              columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
              spacing={2}
              defaultHeight={450}
              sx={{ margin: 0 }}
            >
              {currentAnnouncements.map((announcement) => (
                <AnnouncementCard 
                  key={announcement.id} 
                  announcement={announcement}
                  searchTerm={searchTerm}
                />
              ))}
            </Masonry>
          </AnnouncementSection>
        ) : (
          <NoResults>
            "{searchTerm}"에 대한 검색 결과가 없습니다.
            <br />
            다른 단어로 검색을 시도해주세요!
          </NoResults>
        )}

        {filteredAnnouncements.length > 0 && (
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

export default AnnouncementList;