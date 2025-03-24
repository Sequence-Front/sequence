import React from 'react';
import styled from 'styled-components';

interface NoticeItemProps {
  id: number;
  message: string;
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

const NoticeItem: React.FC<NoticeItemProps> = ({ id, message, type, onAccept, onDecline, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Title>{message}</Title>

      {type === "invite" && (
        <ButtonContainer>
          <Button onClick={() => onAccept?.(id)}>수락</Button>
          <Button onClick={() => onDecline?.(id)}>거절</Button>
        </ButtonContainer>
      )}

      {type === "archive" && (
        <Button onClick={onClick}>팀원평가 하러가기</Button>
      )}
    </Container>
  );
};

export default NoticeItem;
