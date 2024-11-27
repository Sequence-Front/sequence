//2024-11-28 02:20 정준용완성
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { SlArrowDown } from "react-icons/sl";

const Container = styled.div`
  background-color: #151515;
  color: white;
  width: 100%;
`

const EducationContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
`

const InputContainer = styled.div`
  display: flex;
  width: 33%;
  align-items: center;
  margin-bottom: clamp(5px, 1vw, 1rem);
  flex: 1;
  position: relative;
`

const Input = styled.input`
  display: flex;
  flex: 1;
  padding: clamp(0.5rem, 1vw, 15px);
  font-size: clamp(10px, 1vw, 1.3rem);
  padding-left: 0;
  background: #151515;
  color: white;
  border: none;
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
  cursor: pointer;
`

const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  right: 0;
  margin-top: 2px;
  padding: 0;
  background: #212121;
  border: none;
  list-style: none;
  overflow-y: auto;
  z-index: 100;
  max-height: 150px;

  & > li {
    padding: 10px 15px;
    cursor: pointer;

    &:hover {
      background: #141414;
    }
  }
`

const Dropdown = styled.div`
  position: relative;
  flex: 1;
  margin-bottom: clamp(5px, 1vw, 1rem);
`

const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  font-size: clamp(10px, 1vw, 1.3rem);
  padding: clamp(0.5rem, 1vw, 15px);
  padding-left: 0;
  background: #151515;
  color: #9e9e9e;
  border: none;
  border-bottom: 1px solid #616161;
  cursor: pointer;
  line-height: normal;

  &:focus {
    outline: none;
    border-bottom: 1px solid #e0e0e0;
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

const Education = ({ onDataChange }: EducationProps) => {
  const [schoolName, setSchoolName] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("학년");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [status, setStatus] = useState("학적상태");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const schoolOptions = ["홍익대학교", "홍익대학교(세종)"];

  const handleSchoolSelect = (school: string) => {
    setSchoolName(school);
    setIsDropdownOpen(false);
    handleUpdate({ schoolName: school });
  };

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

  const handleSearchClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleUpdate = (updates: Partial<EducationProps["onDataChange"]>) => {
    onDataChange({
      schoolName,
      major,
      year,
      startYear,
      endYear,
      status,
      ...updates,
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
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
      <EducationContainer>
        <InputContainer ref={dropdownRef}>
          <Input
            placeholder="학교명을 입력해주세요"
            value={schoolName}
            onChange={(e) => {
              setSchoolName(e.target.value);
              handleUpdate({ schoolName: e.target.value });
            }}
          />
          <IconContainer onClick={handleSearchClick}>
            <CiSearch style={{ fontSize: "clamp(1.5rem, 2vw , 2.4rem)" }} />
          </IconContainer>
          {isDropdownOpen && (
            <DropdownList>
              {schoolOptions.map((school) => (
                <li key={school} onClick={() => handleSchoolSelect(school)}>
                  {school}
                </li>
              ))}
            </DropdownList>
          )}
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
          <IconContainer>
            <SlArrowDown style={{ color: "red", fontSize: "clamp(0.9rem, 2vw, 1.6rem)", strokeWidth: "1" }} />
          </IconContainer>
        </Dropdown>
      </EducationContainer>
      <EducationContainer>
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
          <IconContainer>
            <SlArrowDown style={{ color: "red", fontSize: "clamp(0.9rem, 2vw, 1.6rem)", strokeWidth: "1" }} />
          </IconContainer>
        </Dropdown>
      </EducationContainer>
    </Container>
  );
};

export default Education;
