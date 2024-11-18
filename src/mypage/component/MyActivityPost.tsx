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
  margin : 0.5rem 0;
`

const StatusContainer = styled.div`
  display: flex;
  width: 20%;
`

const Status = styled.div<{ isActive: boolean }>`
  display: flex;
  background-color: ${(props) => (props.isActive ? 'red' : 'none')};
  color: ${(props) => (props.isActive ? 'white' : '#616161')};
  padding: 0.4rem 1rem;
  border: 1px solid ${(props) => (props.isActive ? 'red' : '#616161')};
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
`

const Title = styled.span`
  flex: 1;
  margin: 0 1.5rem;
  font-size: 1rem;
  text-align: left;
`

const Date = styled.span`
  font-size: 0.9rem;
  color: #757575;
  margin-right: 1rem;
`

const Comments = styled.span`
  font-size: 0.9rem;
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
