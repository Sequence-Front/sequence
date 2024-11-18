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
  margin: 0.5rem 0;
  padding: 1rem;
  cursor: pointer;
`

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Thumbnail = styled.img`
  width: 6rem;
  height: 6rem;
  background-color: #ccc;
  object-fit: cover;
  margin-right: 2rem;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 9px;
`

const UserName = styled.div`
  font-size: 1.2rem;
  margin-right: 2rem;
  font-weight: bold;
`

const UserDetails = styled.div`
  font-size: 0.9rem;
  color: #aaaaaa;
`

const Comment = styled.div`
  font-size: 0.9rem;
  margin-bottom: 1rem;
`

const Collaboration = styled.div`
  font-size: 1rem;
  margin-top: 0.3rem;
  color: #afafaf;
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
          소현님과 <span style={{ color: '#ff3b3b' }}>{member.time}</span> 함께 했어요!
        </Collaboration>
      </DetailContainer>
    </PostContainerWrapper>
      );
};

export default MemberEvaluationPost;