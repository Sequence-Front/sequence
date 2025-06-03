import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";

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
  font-size: 1rem;
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
  background-color: #212121;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
`;

const Skill = styled.div`
  display: flex;
  margin-left: 12px;
  font-size: 1rem;
  &:hover {
    color: #ff5555;
  }
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  color: white;
  cursor: pointer;

  &:hover {
    color: #e32929;
  }
`;

const AddedSkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const SkillTag = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #e32929;
  color: #151515;
  font-size: 1rem;
  border-radius: 20px;
  font-weight: 600;
`;

const RemoveButton = styled(HiXMark)`
  margin-left: 8px;
  font-size: 1.2rem;
  color: #151515;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

const SkillSearch = ({
  results,
  onSkillSelect,
  defaultSkills = [],
}: {
  results: string[];
  onSkillSelect: (skills: string[]) => void;
  defaultSkills?: string[];
}) => {
  const [query, setQuery] = useState("");
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredResults = query
    ? results.filter((skill) =>
        skill.toLowerCase().includes(query.toLowerCase())
      )
    : results;

  const handleSkillSelect = (skill: string) => {
    if (!skillsList.includes(skill)) {
      const updatedList = [...skillsList, skill];
      setSkillsList(updatedList);
      onSkillSelect(updatedList);
    }
    setIsResultsVisible(false);
  };

  const handleDeleteSkill = (skill: string) => {
    const updatedList = skillsList.filter((s) => s !== skill);
    setSkillsList(updatedList);
    onSkillSelect(updatedList);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (defaultSkills.length > 0) {
      setSkillsList(defaultSkills);
      onSkillSelect(defaultSkills);
    }
  }, [defaultSkills]);

  return (
    <Container ref={containerRef}>
      <SearchContainer>
        <SearchBox>
          <Input
            type="text"
            placeholder="스킬 검색..."
            value={query}
            onFocus={() => setIsResultsVisible(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsResultsVisible(true);
            }}
          />
          <SearchIcon />
        </SearchBox>
        <SearchResultsContainer visible={isResultsVisible}>
          {filteredResults.map((skill, index) => (
            <ResultItem key={index} onClick={() => handleSkillSelect(skill)}>
              <Skill>{skill}</Skill>
            </ResultItem>
          ))}
        </SearchResultsContainer>
      </SearchContainer>
      {skillsList.length > 0 && (
        <AddedSkillsContainer>
          {skillsList.map((skill, index) => (
            <SkillTag key={index}>
              {skill}
              <RemoveButton onClick={() => handleDeleteSkill(skill)} />
            </SkillTag>
          ))}
        </AddedSkillsContainer>
      )}
    </Container>
  );
};

export default SkillSearch;
