//11-19 05:48 준용 작성완료
// 팀원 평가 Post

import React from "react";
import styled from "styled-components";

// Duration enum values
export enum Duration {
  ONE_MONTH_LESS = "ONE_MONTH_LESS",
  ONE_TO_THREE_MONTH = "ONE_TO_THREE_MONTH",
  THREE_TO_SIX_MONTH = "THREE_TO_SIX_MONTH",
  SIX_TO_ONE_YEAR = "SIX_TO_ONE_YEAR",
  OVER_ONE_YEAR = "OVER_ONE_YEAR",
}

// Function to convert duration enum to Korean text
const formatDuration = (duration: string): string => {
  switch (duration) {
    case Duration.ONE_MONTH_LESS:
      return "한달이하";
    case Duration.ONE_TO_THREE_MONTH:
      return "1달~3달";
    case Duration.THREE_TO_SIX_MONTH:
      return "3달~6달";
    case Duration.SIX_TO_ONE_YEAR:
      return "6달~1년";
    case Duration.OVER_ONE_YEAR:
      return "1년이상";
    default:
      return duration; // Return original value if not found
  }
};

type MemberDataType = {
  content: string;
  duration: string;
};

type MemberProps = {
  member: MemberDataType;
};

const PostContainerWrapper = styled.div`
  display: flex;
  background-color: #212121;
  flex-direction: row;
  margin: clamp(0.3rem, 1vw, 0.5rem) 0;
  padding: clamp(0.8rem, 2vw, 1rem);
  cursor: pointer;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Thumbnail = styled.img`
  width: clamp(4rem, 8vw, 6rem);
  height: clamp(4rem, 8vw, 6rem);
  background-color: #ccc;
  object-fit: cover;
  margin-right: clamp(1rem, 3vw, 2rem);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: clamp(5px, 0.9vw, 8px);
`;

const UserName = styled.div`
  font-size: clamp(0.8rem, 1.8vw, 1.2rem);
  margin-right: clamp(1rem, 2vw, 2rem);
  font-weight: bold;
`;

const UserDetails = styled.div`
  flex: 1;
  font-size: clamp(0.6rem, 1.2vw, 0.9rem);
  color: #aaaaaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Comment = styled.div`
  font-size: clamp(0.6rem, 1.2vw, 0.9rem);
  margin-bottom: clamp(0.8rem, 2vw, 1rem);
`;

const Collaboration = styled.div`
  font-size: clamp(0.6rem, 1.2vw, 0.9rem);
  margin-top: clamp(0.2rem, 1vw, 0.3rem);
  color: #afafaf;

  span {
    color: #ff3b3b;
  }
`;

const MemberEvaluationPost = ({ member }: MemberProps) => {
  return (
    <PostContainerWrapper>
      <DetailContainer>
        <Comment>{member.content}</Comment>
        <Collaboration>
          <span>{formatDuration(member.duration)}</span>
        </Collaboration>
      </DetailContainer>
    </PostContainerWrapper>
  );
};

export default MemberEvaluationPost;
