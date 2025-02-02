import React, { useState } from 'react';
import styled from 'styled-components';
import CommentDetail from './CommentDetail';

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
  font-size: clamp(1rem, 1.5vw, 1.5rem);

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

const CommentSection = () => {
  const [comment, setComment] = useState('');
  const maxLength = 300;

  const [comments, setComments] = useState([
    {
      id: 1,
      profile: "https://buly.kr/GZwmWfY",
      nickname: '홍길동',
      role: '팀장',
      timestamp: '24.08.08 10:44',
      commentText: '안녕하세요! ○○ 공모전에 관심이 많아서 댓글 남깁니다.',
    },
    {
      id: 2,
      profile: "https://buly.kr/GZwmWfY",
      nickname: '박승균',
      role: '',
      timestamp: '24.08.09 11:20',
      commentText: '저도 기획에 관심 있습니다. 함께 할 수 있으면 좋겠습니다!',
    },
  ]);

  const [replies, setReplies] = useState<{ [key: number]: any[] }>({
    1: [
      {
        profile: "https://buly.kr/GZwmWfY",
        nickname: "김대연",
        role: "팀장",
        timestamp: "24.08.08 11:00",
        commentText: "첫 번째 댓글에 대한 답글에 대한 댓글에 대한 답글입니다.",
      },
    ],
    2: [],
  });

  const totalCommentsAndReplies = comments.length + Object.values(replies).reduce((acc, curr) => acc + curr.length, 0);

  const handleSubmit = () => {
    if (comment.trim() !== '') {
      const newComment = {
        id: comments.length + 1,
        profile: "https://buly.kr/GZwmWfY",
        nickname: '새 사용자',
        role: '',
        timestamp: new Date().toLocaleString(),
        commentText: comment,
      };
      setComments([...comments, newComment]);
      setReplies({ ...replies, [newComment.id]: [] });
      setComment('');
    }
  };

  const handleAddReply = (commentId: number, newReply: any) => {
    setReplies({
      ...replies,
      [commentId]: [...(replies[commentId] || []), newReply],
    });
  };

  return (
    <CommentContainer>
      <CommentCount>
        <span>댓글</span>({totalCommentsAndReplies})
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
          key={commentData.id}
          profile={commentData.profile}
          nickname={commentData.nickname}
          role={commentData.role}
          timestamp={commentData.timestamp}
          commentText={commentData.commentText}
          replies={replies[commentData.id] || []}
          onAddReply={(newReply) => handleAddReply(commentData.id, newReply)}
          isReplyEnabled={true}
        />
      ))}
    </CommentContainer>
  );
};

export default CommentSection;
