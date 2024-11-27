//2024-11-28 02:20 정준용완성
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { SlArrowDown } from "react-icons/sl";
import { AiOutlinePlus } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  background-color: #151515;
  color: white;
  width: 100%;
  flex-direction: column;
`

const ContentContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`

const ActivityContainer = styled.div<{ focused: boolean }>`
  display: flex;
  width: 55%;
  border-bottom: ${(props) => (props.focused ? "1px solid #e0e0e0" : "1px solid #757575")};
  align-items: center;
  margin-right: 20px;
`

const Dropdown = styled.div`
  display: flex;
  position: relative;
`

const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: clamp(10px, 1.2vw, 1.3rem);
  padding: 10px;
  padding-left: 0;
  background: #151515;
  color: #e32929;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  font-size: clamp(10px, 1.2vw, 1.3rem);
  width: clamp(5rem, 9vw, 9rem);
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

const Input = styled.input`
  display: flex;
  flex:1;
  background: #151515;
  padding: clamp(0.5rem, 1vw, 15px);
  font-size: clamp(10px, 1.2vw, 1.3rem);
  color: white;
  border: none;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
  }
`

const Label = styled.div`
  display: flex;
  width: 40%;
  flex-shrink: 0;
  font-size: clamp(10px, 1.2vw, 1.3rem);
  padding: clamp(0.5rem, 1.2vw, 15px);
  padding-left: 0;
  color: white;
`

const DateContainer = styled.div<{ focused: boolean }>`
  display: flex;
  flex:1;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${(props) => (props.focused ? "1px solid #e0e0e0" : "1px solid #757575")};
`

const DateInputs = styled.div`
  display: flex;
  align-items: center;
`

const DateInput = styled.input`
  display: flex;
  width: clamp(0.5rem, 1.3vw, 1.4rem);
  background: #151515;
  color: white;
  border: none;
  font-size: clamp(10px, 1.2vw, 1.3rem);
  text-align: center;
  padding: 10px 2px;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
  }
`

const Dash = styled.div`
  display: flex;
  color: #9e9e9e;
  margin-right: 2px;
`

const TextArea = styled.textarea`
  display: flex;
  width: 100%;
  background: #151515;
  color: white;
  border: none;
  border-bottom: 1px solid #757575;
  margin-top: 10px;
  margin-bottom: 2rem;
  font-size: clamp(10px, 1.2vw, 1.3rem);
  padding: clamp(0.5rem, 1vw, 15px);
  padding-left: 0;
  padding-right: 0;
  resize: none;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #e0e0e0;
  }
`

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  color: #e32929;

  svg {
    font-size: 24px;
  }

  &:hover {
    color: #ff5555;
  }
`

const ActivityBlock = styled.div`
  margin-bottom: 20px;
`

interface QualificationData {
  type: string;
  name: string;
  date: [string, string, string];
  description: string;
}

interface QualificationProps {
  onDataChange: (data: QualificationData[]) => void;
}

const Qualification = ({onDataChange}: QualificationProps) => {
  const [qualifications, setQualifications] = useState<QualificationData[]>([
    { type: "유형 선택", name: "", date: ["", "", ""], description: "" },
  ]);

  const startRefs = useRef<Array<Array<React.RefObject<HTMLInputElement>>>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [focusedDateIndex, setFocusedDateIndex] = useState<number | null>(null);
  const [textAreasRows, setTextAreasRows] = useState<number[]>([1]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>([false]);

  useEffect(() => {
    onDataChange(qualifications);
  }, [qualifications, onDataChange]);

  const handleAddActivity = () => {
    setQualifications((prev) => [
      ...prev,
      { type: "유형 선택", name: "", date: ["", "", ""], description: "" },
    ]);
    setTextAreasRows((prev) => [...prev, 1]);
    setIsDropdownOpen((prev) => [...prev, false]);
    startRefs.current.push([React.createRef(), React.createRef(), React.createRef()]);
  };

  const handleDateChange = (
    index: number,
    type: "date",
    fieldIndex: number,
    value: string
  ) => {
    const updatedQualifications = [...qualifications];
    let newValue = value.replace(/[^0-9]/g, "");

    if (fieldIndex === 1 && parseInt(newValue, 10) > 12) {
      newValue = "12";
    }
    if (fieldIndex === 2 && parseInt(newValue, 10) > 31) {
      newValue = "31";
    }

    updatedQualifications[index][type][fieldIndex] = newValue.slice(0, 2);
    setQualifications(updatedQualifications);
  };

  const handleDropdownToggle = (index: number) => {
    setIsDropdownOpen((prev) =>
      prev.map((open, idx) => (idx === index ? !open : false))
    );
  };

  const handleDropdownSelect = (index: number, value: string) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index].type = value;
    setQualifications(updatedQualifications);
    setIsDropdownOpen((prev) =>
      prev.map((open, idx) => (idx === index ? false : open))
    );
  };


  const handleChange = (
    index: number,
    field: "type" | "name" | "description",
    value: string
  ) => {
    const updatedQualifications = [...qualifications];
    
    updatedQualifications[index][field] = value;
    setQualifications(updatedQualifications);

    if (field === "description") {
      const lineCount = value.split("\n").length;
      setTextAreasRows((prev) =>
        prev.map((rows, idx) => (idx === index ? Math.min(lineCount, 5) : rows))
      );
    }
  };
  
  return (
    <Container>
      {qualifications.map((activity, index) => (
        <ActivityBlock key={index}>
          <ContentContainer>
            <ActivityContainer focused={focusedIndex === index}>
              <Dropdown>
                <DropdownButton onClick={() => handleDropdownToggle(index)}>
                  {activity.type}
                  <SlArrowDown style={{ marginLeft: "8px" }} />
                </DropdownButton>
                {isDropdownOpen[index] && (
                  <DropdownList>
                    {["수상", "자격/면허", "어학"].map((option) => (
                      <li key={option} onClick={() => handleDropdownSelect(index, option)}>
                        {option}
                      </li>
                    ))}
                  </DropdownList>
                )}
              </Dropdown>
              <Input
                placeholder="주최 기관을 적어주세요."
                value={activity.name}
                onChange={(e) => {
                  const updatedQualifications = [...qualifications];
                  updatedQualifications[index].name = e.target.value;
                  setQualifications(updatedQualifications);
                }}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
              />
            </ActivityContainer>
            <DateContainer focused={focusedDateIndex === index}>
              <Label>수상/취득일자</Label>
              <DateInputs>
              {activity.date.map((value, fieldIndex) => (
                <React.Fragment key={`start-${fieldIndex}`}>
                  <DateInput
                    type="text"
                    placeholder="00"
                    value={value}
                    ref={startRefs.current[index]?.[fieldIndex]}
                    onChange={(e) => handleDateChange(index, "date", fieldIndex, e.target.value)}
                    onFocus={() => setFocusedDateIndex(index)}
                    onBlur={() => setFocusedDateIndex(null)}
                  />
                  {fieldIndex < 2 && <Dash>.</Dash>}
                </React.Fragment>
              ))}
              </DateInputs>
            </DateContainer>
          </ContentContainer>
          <TextArea
            placeholder="자격증 또는 수상명을 적어주세요!"
            rows={textAreasRows[index]}
            value={activity.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
          />
        </ActivityBlock>
      ))}
      <AddButton>
        <AiOutlinePlus
          onClick={handleAddActivity}
          style={{ border: "1px solid red", padding: "5px", cursor: "pointer" }}
        />
      </AddButton>
    </Container>
  );
};

export default Qualification;
