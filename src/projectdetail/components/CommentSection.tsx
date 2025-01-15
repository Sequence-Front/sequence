import React, { useState } from 'react';
import styled from 'styled-components';

const CommentContainer = styled.div`
  margin: 2rem 0;
`;

const CommentCount = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
  
  span {
    margin-right: 0.25rem;
  }
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  border-bottom: 1px solid #424242;
  border-top: 1px solid #424242;
  padding: 1rem 0;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 1rem;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #757575;
  }
`;

const CharCount = styled.span`
  color: #757575;
  font-size: 0.9rem;
  align-self: center;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: #E53935;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    background-color: #D32F2F;
  }
`;

const CommentSection = () => {
  const [comment, setComment] = useState('');
  const maxLength = 300;
  const commentCount = 10; // 실제로는 props나 API로 받아올 값

  const handleSubmit = () => {
    // 댓글 제출 로직
  };

  return (
    <CommentContainer>
      <CommentCount>
        <span>댓글</span>({commentCount})
      </CommentCount>
      <CommentInputWrapper>
        <StyledInput
          placeholder="궁금한 점은 직접 댓글로 물어보세요!"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={maxLength}
        />
        <CharCount>{`${comment.length}/${maxLength}`}</CharCount>
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </CommentInputWrapper>
    </CommentContainer>
  );
};

export default CommentSection;
