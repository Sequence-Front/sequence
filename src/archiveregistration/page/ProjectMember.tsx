import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";
import { memberSearch } from "../../api/member";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #151515;
  color: white;
  box-sizing: border-box;
  margin-bottom: clamp(1rem, 2vw, 2rem);
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  padding: clamp(8px, 0.6vw, 0.8rem);
  padding-left: 0;
  width: 100%;
  position: relative;
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #757575;
  }
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: white;
  font-size: clamp(10px, 1vw, 18px);
  outline: none;

  &::placeholder {
    color: #9e9e9e;
  }
`;

const SearchIcon = styled(FiSearch)`
  color: #e32929;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: #ff5555;
  }
`;

const SearchResultsContainer = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  background-color: #151515;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
`;


const ProfileImage = styled.div<{ src: string }>`
  width: clamp(15px, 1.7vw, 30px);
  height: clamp(15px, 1.7vw, 30px);
  border-radius: 50%;
  background-color: white;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  margin-right: 10px;
`;

const UserName = styled.div`
  margin-right: 10px;
  font-size: clamp(12px, 1.5vw,24px);
  color: white;
`;

const RoleTag = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  font-size: clamp(8px, 1vw, 16px);
  color: white;
  border: 1px solid white;
  border-radius: 15px;
  white-space: nowrap;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  color: white;
  cursor: pointer;
  background-color: #252525;
  
  ${ProfileImage}{
    margin-left: 10px;
  }

  ${ProfileImage}, ${RoleTag},${UserName}{
    transform: scale(0.9);
  }

  &:hover {
    ${UserName}, ${RoleTag} {
      color: #e32929;
    }
    
    ${RoleTag} {
      border-color: #e32929;
    }
  }
`;

const AddedMembersContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color: #151515;
  padding: 0;
  border-radius: 8px;
  overflow-y: auto;
`;

const MemberRow = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #212121;
  }
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
`;
const ProjectMember  = ({ onMemberSelect }: { onMemberSelect: (members: { id: number; name: string; role: string; profile: string }[]) => void }) => {
  const [userList, setUserList] = useState<
    { id: number; name: string; role: string; profile: string }[]
  >([]);
  const [results, setResults] = useState<{ name: string; role: string; profile: string }[]>([]);
    
  const [query, setQuery] = useState("");
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleUserSelect = (user: { name: string; role: string; profile: string }) => {
    if (!userList.find((u) => u.name === user.name && u.role === user.role)) {
      const updatedList = [
        ...userList,
        { id: userList.length + 1, name: user.name, role: user.role, profile: user.profile },
      ];
      setUserList(updatedList);
      onMemberSelect(updatedList);
      setIsResultsVisible(false);
    }
  };

    useEffect(() => {
      const fetchMembers = async () => {
        if (query.trim() !== "") {
          const res = await memberSearch(query);
  
          if (!res.isDuplicate && res.message && res.message.data) {
            const formattedResults = res.message.data.map((nickname: string) => ({
              name: nickname,
              role: "Front-End", 
              profile: "", 
            }));
            setResults(formattedResults);
          } else {
            setResults([]);
          }
        } else {
          setResults([]);
        }
      };
  
      fetchMembers();
    }, [query]);

  const handleDeleteUser = (id: number) => {
    const updatedList = userList.filter((user) => user.id !== id);
    setUserList(updatedList);
    onMemberSelect(updatedList);
  };

 const filteredResults = query
    ? results.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.role.toLowerCase().includes(query.toLowerCase())
      )
    : results;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <SearchContainer>
        <SearchBox>
          <Input
            type="text"
            placeholder="찾고 싶은 멤버명을 입력해주세요!"
            value={query}
            onFocus={() => setIsResultsVisible(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsResultsVisible(true);
            }}
          />
          <SearchIcon style={{ fontSize:"clamp(18px, 1.5vw, 26px)" }} />
        </SearchBox>
        <SearchResultsContainer visible={isResultsVisible}>
          {filteredResults.map((user, index) => (
            <ResultItem key={index} onClick={() => handleUserSelect(user)}>
              <ProfileImage src={user.profile} />
              <UserName>{user.name}</UserName>
              <RoleTag>{user.role}</RoleTag>
            </ResultItem>
          ))}
        </SearchResultsContainer>
      </SearchContainer>
      {userList.length > 0 && (
        <AddedMembersContainer>
          {userList.map((user) => (
            <MemberRow key={user.id}>
              <MemberInfo>
                <ProfileImage src={user.profile} />
                <UserName>{user.name}</UserName>
                <RoleTag>{user.role}</RoleTag>
              </MemberInfo>
              <HiXMark style={{marginLeft:"0.3rem", fontSize:"clamp(1.8rem,2vw, 3rem)", color :"#e32929", cursor: "pointer"}}onClick={() => handleDeleteUser(user.id)}/>
            </MemberRow>
          ))}
        </AddedMembersContainer>
      )}
    </Container>
  );
};

export default ProjectMember;
