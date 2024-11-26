import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { SlArrowDown } from "react-icons/sl";

const Container = styled.div`
  background-color: #121212;
  color: white;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
`

const Input = styled.input`
  display: flex;
  flex: 1;
  padding: 15px;
  padding-left: 0;
  background: #121212;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: bold;
  border-bottom: 1px solid #616161;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #e0e0e0;
  }
`

const IconContainer = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #e32929;
  font-size: 30px;
  stroke-width: 0.5;
`

const Dropdown = styled.div`
  position: relative;
  flex: 1;
`

const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px;
  padding-left: 0;
  background: #121212;
  color: #9e9e9e;
  border: none;
  border-bottom: 1px solid #616161;
  cursor: pointer;

  &:focus {
    outline: none;
    border-bottom: 1px solid #e0e0e0;
  }
`

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 2px;
  padding: 0;
  background: #212121;
  border: none;
  list-style: none;
  overflow-y: auto;
  z-index: 100;

  & > li {
    padding: 10px 15px;
    cursor: pointer;

    &:hover {
      background: #141414;
    }
  }
`

export interface EducationProps {
  onDataChange: (data: {
    schoolName: string;
    major: string;
    year: string;
    startYear: string;
    endYear: string;
    status: string;
  }) => void;
}

const Education = ({onDataChange}:EducationProps) => {
  const [schoolName, setSchoolName] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("학년");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [status, setStatus] = useState("학적상태");

  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const yearRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const handleSelectYear = (option: string) => {
    setYear(option);
    setIsYearOpen(false);
    handleUpdate({ year: option });
  };

  const handleSelectStatus = (option: string) => {
    setStatus(option);
    setIsStatusOpen(false);
    handleUpdate({ status: option });
  };

  // 데이터 업데이트 핸들러
  const handleUpdate = (updates: Partial<EducationProps["onDataChange"]>) => {
    onDataChange({
      schoolName,
      major,
      year,
      startYear,
      endYear,
      status,
      ...updates, // 변경된 데이터만 덮어쓰기
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      yearRef.current &&
      !yearRef.current.contains(event.target as Node) &&
      statusRef.current &&
      !statusRef.current.contains(event.target as Node)
    ) {
      setIsYearOpen(false);
      setIsStatusOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <Row>
        <InputContainer>
          <Input
            placeholder="학교명을 입력해주세요"
            value={schoolName}
            onChange={(e) => {
              setSchoolName(e.target.value);
              handleUpdate({ schoolName: e.target.value });
            }}
          />
          <IconContainer>
            <CiSearch />
          </IconContainer>
        </InputContainer>
        <InputContainer>
          <Input
            placeholder="전공명을 입력해주세요"
            value={major}
            onChange={(e) => {
              setMajor(e.target.value);
              handleUpdate({ major: e.target.value });
            }}
          />
        </InputContainer>
        <Dropdown ref={yearRef}>
          <DropdownButton onClick={() => setIsYearOpen((prev) => !prev)}>
            {year}
            <SlArrowDown style={{ color: "red", fontSize: "1.5rem", strokeWidth: "1" }} />
          </DropdownButton>
          {isYearOpen && (
            <DropdownList>
              {["1학년", "2학년", "3학년", "4학년", "5학년", "6학년", "졸업"].map((option) => (
                <li key={option} onClick={() => handleSelectYear(option)}>
                  {option}
                </li>
              ))}
            </DropdownList>
          )}
        </Dropdown>
      </Row>
      <Row>
        <InputContainer>
          <Input
            placeholder="입학연도 ex) 2000"
            maxLength={4}
            value={startYear}
            onChange={(e) => {
              setStartYear(e.target.value);
              handleUpdate({ startYear: e.target.value });
            }}
          />
        </InputContainer>
        <InputContainer>
          <Input
            placeholder="졸업연도 ex) 2000"
            maxLength={4}
            value={endYear}
            onChange={(e) => {
              setEndYear(e.target.value);
              handleUpdate({ endYear: e.target.value });
            }}
          />
        </InputContainer>
        <Dropdown ref={statusRef}>
          <DropdownButton onClick={() => setIsStatusOpen((prev) => !prev)}>
            {status}
            <SlArrowDown style={{ color: "red", fontSize: "1.5rem", strokeWidth: "1" }} />
          </DropdownButton>
          {isStatusOpen && (
            <DropdownList>
              {["재학", "휴학", "졸업", "졸업유예"].map((option) => (
                <li key={option} onClick={() => handleSelectStatus(option)}>
                  {option}
                </li>
              ))}
            </DropdownList>
          )}
        </Dropdown>
      </Row>
    </Container>
  );
};

export default Education;
