import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface NoticeItemProps {
  id: number;
  message: string;
  date: string;
  type: "invite" | "archive" | "info";
  onAccept?: (id: number) => void; 
  onDecline?: (id: number) => void; 
  onClick?: () => void; 
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  color: white;
  font-family: 'SUIT', sans-serif;
  margin: 0px auto;
  padding: 1rem;
  margin-bottom : 1rem;
`

const Title = styled.div`
  display: flex;
  font-size: 20px;
  line-height: 150%;
  margin-bottom: 0.5rem;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`

const DateText = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-top: 0.4rem;
`

const Button = styled.button`
  flex: 1;
  background-color: #212121;
  border: 1px solid #E32929;
  cursor: pointer;
  color: #E32929;
  justify-content: center;
  font-size: 18px;
  padding: 0.8rem;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: #E32929;
    color: #212121;
  }
`

const NoticeItem: React.FC<NoticeItemProps> = ({ id, message, type, date, onAccept, onDecline, onClick }) => {
  const navigate = useNavigate();

  const getDateDiff = (dateStr: string) => {
    const today = new Date();
    const target = new Date(dateStr);
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const targetDate = new Date(target.getFullYear(), target.getMonth(), target.getDate());
    const diffTime = todayDate.getTime() - targetDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const diffDays = getDateDiff(date);
  if (diffDays > 3) return null; 

  const getDateDiffText = (diff: number) => {
    if (diff === 0) return '오늘';
    return `${diff}일 전`;
  };

  const ArchiveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (type === "archive") {
      navigate(`/${id}/teamevaluation`);
    }
  };

  return (
    <Container onClick={onClick}>
      <Title>{message}</Title>

      {type === "invite" && (
        <ButtonContainer>
          <Button onClick={(e) => { e.stopPropagation(); onAccept?.(id); }}>수락</Button>
          <Button onClick={(e) => { e.stopPropagation(); onDecline?.(id); }}>거절</Button>
        </ButtonContainer>
      )}

      {type === "archive" && (
        <Button onClick={ArchiveClick}>팀원평가 하러가기</Button>
      )}

      <DateText>{getDateDiffText(diffDays)}</DateText>
    </Container>
  );
};

export default NoticeItem;