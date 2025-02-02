import React, { useState } from "react";
import styled from "styled-components";
import { PiSirenLight } from "react-icons/pi";
import { ReactComponent as Replyimg } from "../../asset/image/ReplyImg.svg";
import CommentInput from "./CommentInput";

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

interface Reply {
  profile: string;
  nickname: string;
  role?: string;
  timestamp: string;
  commentText: string;
}

interface CommentDetailProps {
  profile: string;
  nickname: string;
  role?: string;
  timestamp: string;
  commentText: string;
  replies: Reply[];
  onAddReply: (newReply: Reply) => void;
  isReplyEnabled: boolean;
}

const CommentDetail = ({
  profile,
  nickname,
  role,
  timestamp,
  commentText,
  replies,
  onAddReply,
  isReplyEnabled,
}: CommentDetailProps) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [reply, setReply] = useState("");

  const handleReplySubmit = () => {
    if (reply.trim() !== "") {
      const newReply: Reply = {
        profile: "https://buly.kr/GZwmWfY",
        nickname: "현재 사용자",
        role: "멤버",
        timestamp: new Date().toLocaleString(),
        commentText: reply,
      };
      onAddReply(newReply);
      setReply("");
    }
  };

  return (
    <CommentContainer>
      <ReportIcon>
        <PiSirenLight />
      </ReportIcon>
      <UserName>
        <ProfileImage src={profile} alt={`${nickname}'s profile`} />
        {nickname}
        {role && <Role>{role}</Role>}
        <TimeStamp>{timestamp}</TimeStamp>
      </UserName>
      <CommentText>{commentText}</CommentText>
      {isReplyEnabled && (
        <ReplyButton onClick={() => setShowReplyInput(!showReplyInput)}>
          {showReplyInput ? "취소" : "답글"}
        </ReplyButton>
      )}
      <ReplyContainer>
        {replies.map((reply, index) => (
          <ReplyItem key={index}>
            <Replyimg style={{width:'3.5rem'}} />
            <ReplyContent>
            <ReportIcon>
                <PiSirenLight />
            </ReportIcon>
              <UserName>
                <ProfileImage src={reply.profile} alt={`${reply.nickname}'s profile`} />
                {reply.nickname}
                {reply.role && <Role>{reply.role}</Role>}
                <TimeStamp>{reply.timestamp}</TimeStamp>
              </UserName>
              <ReplyText>{reply.commentText}</ReplyText>
            </ReplyContent>
          </ReplyItem>
        ))}
        {isReplyEnabled && showReplyInput && (
          <ReplyInputWrapper>
            <Replyimg style={{width:'3.5rem'}} />
            <ReplyToContainer>
            <ReplyToText>'{nickname}'님에게 답글</ReplyToText>
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
