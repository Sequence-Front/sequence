import React, { useState } from "react";
import styled from "styled-components";
import { PiSirenLight } from "react-icons/pi";
import { ReactComponent as Replyimg } from "../../asset/image/ReplyImg.svg";
import CommentInput from "./CommentInput";
import { useParams } from "react-router-dom";
import { CommentPost, CommentPut, CommentDelete } from "../../api/projectComment";

const CommentContainer = styled.div`
  position: relative;
  background-color: none;
  color: white;
  margin: 1rem auto;
  font-family: "SUIT", sans-serif;
  margin: 2rem 0;
`

const UserName = styled.div`
  display: flex;
  align-items: center;
  font-size: clamp(0.7rem, 1.4vw, 1.4rem);
  color: #bdbdbd;
  margin-bottom: 8px;
`

const ProfileImage = styled.img`
  width: clamp(1rem, 2vw, 2rem);
  height: clamp(1rem, 2vw, 2rem);
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #bdbdbd;
  object-fit: cover;
`

const Role = styled.span`
  border: 1px solid #e32929;
  padding: 5px;
  border-radius: 20px;
  font-size: clamp(0.6rem, 1vw, 1rem);
  color: #e32929;
  margin-left: 8px;
`

const TimeStamp = styled.div`
  display: flex;
  font-family: "SUIT";
  font-size: clamp(0.7rem, 1.4vw, 1.4rem);
  color: #bdbdbd;
  margin-left: 14px;
`

const CommentText = styled.div`
  font-family: "SUIT", sans-serif;
  font-size: clamp(0.7rem, 1.4vw, 1.4rem);
  font-weight: 400;
  margin: 1rem 0;
`

const ReplyButton = styled.button`
  background-color: #212121;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  font-size: clamp(0.5rem, 1vw, 1rem);
  border: 1px solid #424242;
  margin-top: 0.5rem;
`

const ReplyContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
`

const ReplyItem = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  margin-top: 1rem;
  position: relative;
`

const ReplyContent = styled.div`
position: relative;
  flex: 1;
  margin-top: 40px;
`

const ReplyInputWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 1rem;
  position: relative;
`

const ReplyToText = styled.span`
font-size: clamp(0.7rem, 1.4vw, 1.4rem);
  font-weight: bold;
  color: #bdbdbd;
  margin-left: 8px;
`

const ReplyText = styled.div`
font-size: clamp(0.7rem, 1.4vw, 1.4rem);
  color: white;
`

const ReportIcon = styled.div`
  position: absolute;
  right: 8px;
  font-size: clamp(1.5rem, 2vw, 2.3rem);
  color: #e32929;
  cursor: pointer;
`

const ReplyToContainer = styled.div`
  display: flex;
  flex: 1;
  margin-top: 2.7rem;
  flex-direction: column;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  background-color: transparent;
  color: #bdbdbd;
  border: none;
  cursor: pointer;
  font-size: clamp(0.5rem, 1vw, 1rem);
  &:hover {
    color: #e32929;
  }
`;

interface CommentDetailProps {
  comment: {
    id: number;
    writer: string;
    content: string;
    createdLocalDateTime: string;
  };
  childComments: Array<{
    id: number;
    writer: string;
    content: string;
    createdLocalDateTime: string;
  }>;
  onCommentAdd: () => void;
}

const CommentDetail = ({
  comment,
  childComments,
  onCommentAdd
}: CommentDetailProps) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [reply, setReply] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);
  const [editReplyContent, setEditReplyContent] = useState("");
  const { id } = useParams();
  const nickname = localStorage.getItem('nickname');

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleReplySubmit = async () => {
    if (reply.trim() !== "") {
      try {
        await CommentPost(id, reply, comment.id);
        setReply("");
        setShowReplyInput(false);
        onCommentAdd();
      } catch (error) {
        console.error('답글 등록 실패:', error);
      }
    }
  };

  const handleEdit = async () => {
    try {
      await CommentPut(id, editContent, comment.id);
      setIsEditing(false);
      onCommentAdd(); // 댓글 목록 새로고침
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      try {
        await CommentDelete(id, comment.id);
        onCommentAdd(); // 댓글 목록 새로고침
      } catch (error) {
        console.error('댓글 삭제 실패:', error);
      }
    }
  };

  const handleReplyEdit = async (commentId: number) => {
    try {
      await CommentPut(id, editReplyContent, commentId);
      setEditingReplyId(null);
      setEditReplyContent("");
      onCommentAdd();
    } catch (error) {
      console.error('답글 수정 실패:', error);
    }
  };

  const handleReplyDelete = async (commentId: number) => {
    if (window.confirm('답글을 삭제하시겠습니까?')) {
      try {
        await CommentDelete(id, commentId);
        onCommentAdd();
      } catch (error) {
        console.error('답글 삭제 실패:', error);
      }
    }
  };

  return (
    <CommentContainer>
      <ReportIcon>
        <PiSirenLight />
      </ReportIcon>
      <UserName>
        <ProfileImage src="https://buly.kr/GZwmWfY" alt={`${comment.writer}'s profile`} />
        {comment.writer}
        <TimeStamp>{formatDateTime(comment.createdLocalDateTime)}</TimeStamp>
      </UserName>
      
      {isEditing ? (
        <CommentInput
          comment={editContent}
          setComment={setEditContent}
          handleSubmit={handleEdit}
          maxLength={300}
        />
      ) : (
        <CommentText>{comment.content}</CommentText>
      )}

      <div style={{ display: 'flex', gap: '1rem' }}>
        <ReplyButton onClick={() => setShowReplyInput(!showReplyInput)}>
          {showReplyInput ? "취소" : "답글"}
        </ReplyButton>
        
        {nickname === comment.writer && (
          <ActionButtons>
            {!isEditing && (
              <>
                <ActionButton onClick={() => setIsEditing(true)}>수정</ActionButton>
                <ActionButton onClick={handleDelete}>삭제</ActionButton>
              </>
            )}
            {isEditing && (
              <ActionButton onClick={() => setIsEditing(false)}>취소</ActionButton>
            )}
          </ActionButtons>
        )}
      </div>

      <ReplyContainer>
        {childComments.map((reply) => (
          <ReplyItem key={reply.id}>
            <Replyimg style={{width:'3.5rem'}} />
            <ReplyContent>
              <ReportIcon>
                <PiSirenLight />
              </ReportIcon>
              <UserName>
                <ProfileImage src="https://buly.kr/GZwmWfY" alt={`${reply.writer}'s profile`} />
                {reply.writer}
                <TimeStamp>{formatDateTime(reply.createdLocalDateTime)}</TimeStamp>
              </UserName>
              
              {editingReplyId === reply.id ? (
                <CommentInput
                  comment={editReplyContent}
                  setComment={setEditReplyContent}
                  handleSubmit={() => handleReplyEdit(reply.id)}
                  maxLength={300}
                />
              ) : (
                <>
                  <ReplyText>{reply.content}</ReplyText>
                  {nickname === reply.writer && (
                    <ActionButtons>
                      <ActionButton onClick={() => {
                        setEditingReplyId(reply.id);
                        setEditReplyContent(reply.content);
                      }}>수정</ActionButton>
                      <ActionButton onClick={() => handleReplyDelete(reply.id)}>삭제</ActionButton>
                    </ActionButtons>
                  )}
                </>
              )}
            </ReplyContent>
          </ReplyItem>
        ))}
        {showReplyInput && (
          <ReplyInputWrapper>
            <Replyimg style={{width:'3.5rem'}} />
            <ReplyToContainer>
              <ReplyToText>'{comment.writer}'님에게 답글</ReplyToText>
              <CommentInput
                comment={reply}
                setComment={setReply}
                handleSubmit={handleReplySubmit}
                maxLength={300}
              />
            </ReplyToContainer>
          </ReplyInputWrapper>
        )}
      </ReplyContainer>
    </CommentContainer>
  );
};

export default CommentDetail;
