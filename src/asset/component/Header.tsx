import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Sequence from '../image/Sequence.svg'
import { useNavigate, useLocation } from 'react-router-dom';
import alert from '../image/alert.png'
import NoticeItem from './NoticeItem';
import { getNotice, acceptNotice, deleteNotice } from '../../api/notice';
import { access } from 'fs';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin: 0 auto;
  justify-content: space-between;
  flex-direction: row;
  background-color: #151515;
  position: relative;
  z-index: 3;
`

const NoticeContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 120%;
  right: 0;
  background-color: #212121;
  width: clamp(25rem, 33vw, 40rem);
  max-height: 40rem; 
  overflow-y: auto; 
  color: white;
  font-family: 'SUIT', sans-serif;
  border-radius: 8px;
  padding: 1rem;
  z-index: 10;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  flex-direction: column;

  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: translateY(${(props) => (props.isOpen ? '0' : '-10px')});
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};
`;


const TitleContainer = styled.div`
  display: flex;
  width: 10%;
  margin-left : clamp(3.5rem, 3.5vw, 7rem);
  flex-direction: row;
  align-items: flex-end;
  cursor: pointer;
`

const Logo = styled.img`
  display: flex;
  margin-bottom: clamp(0.1rem, 0.6vw, 1rem);
  width: clamp(4rem, 8vw, 8rem);
`

const ContentContainer = styled.div`
  display: flex;
  width: 49%;
  justify-content: space-between;
`


const ContentWrap = styled.div`
  display : flex;
  width: 33%;
  justify-content: space-evenly;
`

const Content = styled.div<{ isActive: boolean }>`
  display: flex;
  color: ${(props) => (props.isActive ? '#E32929' : 'white')};
  font-size: clamp(0.8rem, 1.6vw, 1.6rem);
  font-family: 'Playfair Display', serif;
  cursor: pointer;
`

const LoginContainer = styled.div`
  display : flex;
  flex : 1;
  justify-content: flex-end;
`

const Login = styled.div`
  display: flex;
  margin-right: clamp(3rem, 6vw, 6rem);
  cursor: pointer;
  border: 2px solid #E32929;
  padding : 2px clamp(10px, 1.2vw, 1.2rem);
  font-size: clamp(10px, 1.5vw, 1.5rem);
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color : #E32929;
`

const UserContainer = styled.div`
  display: flex;
  margin-right: clamp(2.6rem, 5vw, 5rem);
  width: 30%;
  gap: 30%;
  position: relative;
`
const UserProfile = styled.img`
  display: flex;
  width: clamp(1.3rem, 2.6vw, 2.6rem);
  height: clamp(1.3rem, 2.6vw, 2.6rem);
  border-radius: 50%;
  cursor: pointer;
`

const AlertImg = styled.img`
  display : flex;
  width: clamp(1.3rem, 2.6vw, 2.6rem);
  height: clamp(1.3rem, 2.6vw, 2.6rem);
  cursor: pointer;
`

interface NoticeData {
  inviteProjectOutputList: {
    projectInvitedMemberId: number;
    writer: string;
    title: string;
    inviteDate: string;
  }[];
  userArchiveList: {
    archiveId: number;
    archiveTitle: string;
    createDate: string;
  }[];
}


function Header({  isMain = false }: { isMain?: boolean } ) {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, ] = useState(localStorage.getItem('profile') || '/default-profile.png');
  const [isLogin, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [loginUser, ] = useState(localStorage.getItem("nickname"));

  const getCurrentHeader = () => {
    if (location.pathname.startsWith('/project')) return 'Project';
    if (location.pathname.startsWith('/announcement')) return 'Announcement';
    if (location.pathname.startsWith('/archive')) return 'Archive';
    return '';
  };
  
  const [sortedNotices, setSortedNotices] = useState<
  { id: number; message: string; type: "invite" | "archive"; date: string }[]
>([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await getNotice();
        const data: NoticeData = response.data;

        const inviteProjects = (data.inviteProjectOutputList ?? []).map((project) => ({
          id: project.projectInvitedMemberId,
          message: `${project.writer}님이 '${project.title}'에 초대했습니다.`,
          type: "invite" as const,
          date: project.inviteDate,
        }));

        const userArchives = (data.userArchiveList ?? []).map((archive) => ({
          id: archive.archiveId,
          message: `'${archive.archiveTitle}'의 팀원평가를 해주세요.`,
          type: "archive" as const,
          date: archive.createDate,
        }));

        const mergedList = [...inviteProjects, ...userArchives].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        if (mergedList.length === 0) {
          console.log("알림이 없습니다.");
        }

        setSortedNotices(mergedList);
      } catch (error) {
        console.error('알림 데이터를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchNotices();
  }, []);

  const handleAccept = async (id: number) => {
    try {
      await acceptNotice(id);
      setSortedNotices((prev) => prev.filter((notice) => notice.id !== id));
    } catch (error) {
      console.error("수락 실패:", error);
    }
  };
  
  const handleDecline = async (id: number) => {
    try {
      await deleteNotice(id);
      setSortedNotices((prev) => prev.filter((notice) => notice.id !== id));
    } catch (error) {
      console.error("거절 실패:", error);
    }
  };

  useEffect(() => {
    const updateAuthState = () => {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    };
    window.addEventListener('storage', updateAuthState);

    const handleClickOutside = (event: MouseEvent) => {
      if (isNoticeOpen && !document.querySelector('.notice-container')?.contains(event.target as Node)) {
        setIsNoticeOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('storage', updateAuthState);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNoticeOpen]);
  
  const NoticeClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation(); 
    setIsNoticeOpen((prev) => !prev);
  };

  const currentHeader = getCurrentHeader();

  return (
    <Container>
      {isMain ? (
        <TitleContainer onClick={() => window.location.reload()}>
          <Logo src={Sequence} />
        </TitleContainer>
      ) : (
        <TitleContainer onClick={() => navigate('/')}>
          <Logo src={Sequence} />
        </TitleContainer>
      )}
      <ContentContainer>
        <ContentWrap>
          <Content
            onClick={() => navigate('/project')}
            isActive={currentHeader === 'Project'}
          >
            Project
          </Content>
        </ContentWrap>
        <ContentWrap>
          <Content
            onClick={() => navigate('/archive')}
            isActive={currentHeader === 'Archive'}
          >
            Archive
          </Content>
        </ContentWrap>
        <ContentWrap>
          <Content
            onClick={() => navigate('/announcement')}
            isActive={currentHeader === 'Announcement'}
          >
            Announcement
          </Content>
        </ContentWrap>
      </ContentContainer>
      <LoginContainer>
        {isLogin ? (
          <UserContainer>
          <AlertImg src={alert} onClick={NoticeClick}/>
          <div style = {{position:'relative'}}>
          <UserProfile onClick={() => {navigate(`/mypage?nickname=${loginUser}`); window.location.reload();}} src= {profile} />
          <NoticeContainer isOpen={isNoticeOpen}>
            {sortedNotices.length === 0 ? (
            <div style={{ color: '#999', fontSize: '0.9rem', padding: '0.5rem' }}>
              알림 없음
            </div>
              ) : (
                sortedNotices.map((notice) => (
                  <NoticeItem
                    key={notice.id}
                    id={notice.id}
                    date={notice.date}
                    message={notice.message}
                    type={notice.type}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                  />
                ))
              )}
        </NoticeContainer>
          </div>
        </UserContainer>
      ) : (
        <Login onClick={() => navigate('/login')}>Log In</Login>
      )}
      </LoginContainer>
      
    </Container>
  );
};

export default Header;
