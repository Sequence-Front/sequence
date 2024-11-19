//11-19 준용 작성
// 내 활동 컴포넌트
import React from 'react';
import styled from 'styled-components';

export type PostProps = {
  id: number;
  status: '모집 중' | '모집 완료';
  title: string;
  date: string;
  comments: number;
}

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  margin: clamp(0.3rem, 1vw, 0.5rem) 0; 
`

const StatusContainer = styled.div`
  display: flex;
  width: 20%;
`

const Status = styled.div<{ isActive: boolean }>`
  display: flex;
  background-color: ${(props) => (props.isActive ? 'red' : 'none')};
  color: ${(props) => (props.isActive ? 'white' : '#616161')};
  padding: clamp(0.2rem, 0.8vw, 0.4rem) clamp(0.5rem, 1.5vw, 1rem);
  border: 1px solid ${(props) => (props.isActive ? 'red' : '#616161')};
  border-radius: 20px;
  font-size: clamp(0.6rem, 1.2vw, 1rem); 
  font-weight: bold;
`

const Title = styled.span`
  flex: 1;
  margin: 0 clamp(1rem, 2vw, 1.5rem);
  font-size: clamp(0.8rem, 1.5vw, 1.25rem); 
  text-align: left;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
`

const Date = styled.span`
  font-size: clamp(0.7rem, 1.2vw, 1.2rem); 
  color: #757575;
  margin-right: clamp(0.5rem, 1.5vw, 1rem);
`

const Comments = styled.span`
  font-size: clamp(0.7rem, 1.2vw, 1.2rem);
  color: #757575;
`

export const MyActivityPost = ({ id, status, title, date, comments }: PostProps) => {
  return (
    <PostContainer>
      <StatusContainer>
        <Status isActive={status === '모집 중'}>{status}</Status>
      </StatusContainer>
      <Title>{title}</Title>
      <Date>{date}</Date>
      <Comments>{comments}</Comments>
    </PostContainer>
  );
};
