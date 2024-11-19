//11-19 05:48 준용 작성완료
// 팀원 평가 Post

import React from 'react';
import styled from 'styled-components';

type MemberDataType = {
  name: string;
  affiliation: string;
  content: string;
  time: string;
  img: string;
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
`

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Thumbnail = styled.img`
  width: clamp(4rem, 8vw, 6rem);
  height: clamp(4rem, 8vw, 6rem);
  background-color: #ccc;
  object-fit: cover;
  margin-right: clamp(1rem, 3vw, 2rem); 
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: clamp(5px, 0.9vw, 8px);
`

const UserName = styled.div`
  font-size: clamp(0.8rem, 1.8vw, 1.2rem);
  margin-right: clamp(1rem, 2vw, 2rem);
  font-weight: bold;
`

const UserDetails = styled.div`
  flex:1;
  font-size: clamp(0.6rem, 1.2vw, 0.9rem);
  color: #aaaaaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Comment = styled.div`
  font-size: clamp(0.6rem, 1.2vw, 0.9rem);
  margin-bottom: clamp(0.8rem, 2vw, 1rem);
`

const Collaboration = styled.div`
  font-size: clamp(0.6rem, 1.2vw, 0.9rem);
  margin-top: clamp(0.2rem, 1vw, 0.3rem); 
  color: #afafaf;

  span {
    color: #ff3b3b;
  }
`

const MemberEvaluationPost = ({member}:MemberProps ) => {
  return (
    <PostContainerWrapper >
      <Thumbnail src={member.img} alt={`${member.name}의 사진`} />
      <DetailContainer>
        <UserInfo>
          <UserName>{member.name} 님</UserName>
          <UserDetails>| {member.affiliation}</UserDetails>
        </UserInfo>
        <Comment>{member.content}</Comment>
        <Collaboration>
          소현님과 <span>{member.time}</span> 함께 했어요!
        </Collaboration>
      </DetailContainer>
    </PostContainerWrapper>
  );
};

export default MemberEvaluationPost;