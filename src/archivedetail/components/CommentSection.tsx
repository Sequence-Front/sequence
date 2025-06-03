import React, { useState } from 'react';
import styled from 'styled-components';
import CommentDetail from './CommentDetail';
import { CommentPost } from '../../api/archiveComment';
import { useParams } from 'react-router-dom';

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
  flex: 1;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 1rem;
  padding-left: 0;
  font-weight: 600;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #757575;
  }
`;

const CharCount = styled.span`
  color: #757575;
  font-size: 1rem;
  align-self: center;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: #e53935;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #d32f2f;
  }
`

interface Comment {
  comments: Array<{
    parentComment: {
      id: number;
      writer: string;
      content: string;
      createdDateTime: string;
    };
    childComments: Array<{
      id: number;
      writer: string;
      content: string;
      createdDateTime: string;
    }>;
  }>;
  onCommentAdd: () => void;
}

const CommentSection = ({ comments, onCommentAdd }: Comment) => {
  const [comment, setComment] = useState('');
  const maxLength = 300;
  const { id } = useParams();

  const totalCommentsCount = comments.reduce((total, comment) => 
    total + 1 + comment.childComments.length, 0);

  const handleSubmit = async () => {
    if (comment.trim() !== '') {
      try {
        await CommentPost(id, comment);
        setComment('');
        onCommentAdd();
      } catch (error) {
        console.error('댓글 등록 실패:', error);
      }
    }
  };

  return (
    <CommentContainer>
      <CommentCount>
        <span>댓글</span>({totalCommentsCount})
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
      {comments.map((commentData) => (
        <CommentDetail
          key={commentData.parentComment.id}
          comment={commentData.parentComment}
          childComments={commentData.childComments}
          onCommentAdd={onCommentAdd}
        />
      ))}
    </CommentContainer>
  );
};

export default CommentSection;
