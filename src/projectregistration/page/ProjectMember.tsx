// 2024-1208- 14:56 정준용 완성
import React, { useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #151515;
  color: white;
`

const UserListContainer = styled.div`
  display: flex;
  width: 37.5%;
  flex-direction: column;
  margin-right: clamp(2rem, 3vw, 3rem);
  padding-top: clamp(10px, 1vw, 1rem);
  border-radius: 8px;
  box-sizing: border-box;
`

const SearchContainer = styled.div`
  display: flex;
  width: 62.5%;
  flex-direction: column;
  box-sizing: border-box;
`

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #212121;
  padding: clamp(8px, 1vw, 1rem);
  padding-left: 2.5%;
  width: 100%;
  position: relative;
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 2.5%;
    width: 95%;
    height: 1px;
    background-color: #757575;
  }
`

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: #9e9e9e;
  }
`

const SearchIcon = styled(FiSearch)`
  color: #e32929;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: #ff5555;
  }
`

const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #212121;
  padding: 10px;
  height: clamp(10rem, 20vw, 20rem);
`

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #e32929;
  }
`

const ProfileImage = styled.div<{ src: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  margin-right: 10px;
`

const UserName = styled.div`
  margin-right: 10px;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  color: white;
`

const RoleTag = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 0.9rem;
  color: white;
  border: 1px solid white;
  border-radius: 15px;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e32929;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: #ff5555;
  }
`

const ProjectMember = ({ onMemberSelect }: { onMemberSelect: (members: { id: number; name: string; role: string; profile: string }[]) => void }) => {
  const [userList, setUserList] = useState<
    { id: number; name: string; role: string; profile: string }[]
  >([]);

  
  const [results] = useState([
    { name: "홍길동", role: "PM", profile: "" },
    { name: "홍길동", role: "Front-end", profile: "" },
    { name: "홍길동", role: "Back-end", profile: "" },
  ]);

  const [query, setQuery] = useState("");
  
  const handleUserSelect = (user: { name: string; role: string; profile: string }) => {
    if (!userList.find((u) => u.name === user.name)) {
      const updatedList = [
        ...userList,
        { id: userList.length + 1, name: user.name, role: user.role, profile: user.profile },
      ];
      setUserList(updatedList);
      onMemberSelect(updatedList);
    }
  };

  const handleDeleteUser = (id: number) => {
    const updatedList = userList.filter((user) => user.id !== id);
    setUserList(updatedList);
    onMemberSelect(updatedList);
  };

  const filteredResults = results.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container>
      <UserListContainer>
        {userList.length > 0 ? (
          userList.map((user) => (
            <div key={user.id} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ProfileImage src={user.profile} />
                <UserName>{user.name}</UserName>
                <RoleTag>{user.role}</RoleTag>
                <DeleteButton onClick={() => handleDeleteUser(user.id)}>×</DeleteButton>
              </div>
            </div>
          ))
        ) : (
          <div style={{ color: "#9e9e9e", textAlign: "center" }}>멤버가 없습니다.</div>
        )}
      </UserListContainer>
      <SearchContainer>
        <SearchBox>
          <Input
            type="text"
            placeholder="찾고 싶은 멤버명을 입력해주세요!"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchIcon style={{ paddingRight: "2.5%" }} />
        </SearchBox>
        <SearchResultsContainer>
          {query
            ? filteredResults.map((user, index) => (
                <ResultItem key={index} onClick={() => handleUserSelect(user)}>
                  <ProfileImage src={user.profile} />
                  <UserName>{user.name}</UserName>
                  <RoleTag>{user.role}</RoleTag>
                </ResultItem>
              ))
            : null}
        </SearchResultsContainer>
      </SearchContainer>
    </Container>
  );
};

export default ProjectMember;
