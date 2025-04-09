//11-19 준용 작성
// 내 활동 컴포넌트
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export interface PostProps {
  id: number;
  title: string;
  createdDate: string;
  numberOfComments: number;
  type?: 'archive' | 'project'; // 아카이브인지 프로젝트인지 구분
}

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  margin: clamp(0.3rem, 1vw, 0.5rem) 0;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
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
  min-width: 30px;
  text-align: right;
`

export const MyActivityPost = ({ id, title, createdDate, numberOfComments, type = 'project' }: PostProps) => {
  const navigate = useNavigate();

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}.`;
  // };

  const handleClick = () => {
    if(type == "archive")
      navigate(`/${type}/${id}`);
    else if(type == "project")
      navigate(`/${type}detail/${id}`);
    
    
  };

  return (
    <PostContainer onClick={handleClick}>
      <Title>{title}</Title>
      <Date>{createdDate}</Date>
      <Comments>{numberOfComments}</Comments>
    </PostContainer>
  );
};
