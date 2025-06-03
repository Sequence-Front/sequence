import React from 'react';
import styled from 'styled-components';

const CommentInputWrapper = styled.div`
  display: flex;
  flex:1;
  gap: 1rem;
  margin-top: 1rem;
  border-bottom: 1px solid #424242;
  border-top: 1px solid #424242;
  padding: 1rem 0;
`

const StyledInput = styled.input`
  flex: 1;
  padding: 1rem;
  padding-left: 0;
  background-color: transparent;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #757575;
  }
`

const CharCount = styled.span`
  color: #757575;
  font-size: 0.9rem;
  align-self: center;
`

const SubmitButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: #212121;
  color: #E32929;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    background-color: #D32F2F;
    color: #212121;
  }
`

interface CommentInputProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  maxLength: number;
}

const CommentInput = ({ comment, setComment, handleSubmit, maxLength }: CommentInputProps) => {
  return (
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
  );
};

export default CommentInput;
