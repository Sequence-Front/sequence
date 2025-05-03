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
  justify-content: flex-start;
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
  width: clamp(5rem, 8vw, 9rem);
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
  padding: clamp(0.5rem, 1.2vw, 15px);
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
  flex-shrink: 0;
  font-size: clamp(10px, 1.2vw, 1.3rem);
  padding: clamp(0.5rem, 1vw, 15px);
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
  padding: 10px 0px;

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

interface ActivityData {
  experienceType: string;
  experienceName: string;
  startDate: [string, string, string];
  endDate: [string, string, string];
  experienceDescription: string;
}

interface ActivityProps {
  onDataChange: (data: ActivityData[]) => void;
}

const Activity = ({ onDataChange }: ActivityProps) => {
  const [activities, setActivities] = useState<ActivityData[]>([
    { experienceType: "유형 선택", experienceName: "", startDate: ["", "", ""], endDate: ["", "", ""], experienceDescription: "" },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>([false]);

  const startRefs = useRef<Array<Array<React.RefObject<HTMLInputElement>>>>([]);
  const endRefs = useRef<Array<Array<React.RefObject<HTMLInputElement>>>>([]);
  const [textAreasRows, setTextAreasRows] = useState<number[]>([1]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [focusedDateIndex, setFocusedDateIndex] = useState<number | null>(null);

  useEffect(() => {
    onDataChange(activities);
  }, [activities, onDataChange]);

  const handleAddActivity = () => {
    setActivities((prev) => [
      ...prev,
      { experienceType: "유형 선택", experienceName: "", startDate: ["", "", ""], endDate: ["", "", ""], experienceDescription: "" },
    ]);
    setTextAreasRows((prev) => [...prev, 1]);
    setIsDropdownOpen((prev) => [...prev, false]);
    startRefs.current.push([React.createRef(), React.createRef(), React.createRef()]);
    endRefs.current.push([React.createRef(), React.createRef(), React.createRef()]);
  };

  const ActivityOptions = ["유형 선택", "대외활동", "동아리", "봉사", "교육", "기타"];


  //날짜 수정
  
  const handleDateChange = (
    index: number,
    type: "startDate" | "endDate",
    fieldIndex: number,
    value: string
  ) => {
    const updatedActivities = [...activities];
    const newValue = value.replace(/[^0-9]/g, "").slice(0, 2);
  
    updatedActivities[index][type][fieldIndex] = newValue;
    setActivities(updatedActivities);
  };
  
  
  const handleDateBlur = (
    index: number,
    type: "startDate" | "endDate",
    fieldIndex: number
  ) => {
    const updatedActivities = [...activities];
    let value = updatedActivities[index][type][fieldIndex];
  
    // 1자리면 앞에 0 붙이기
    if (value.length === 1) {
      value = `0${value}`;
    }
  
    if (fieldIndex === 0) {
      updatedActivities[index][type][fieldIndex] = value;
      setActivities(updatedActivities);
      return;
    }
  
    if (value === "00" || value === "0") {
      value = "01";
    }
  
    // 월 보정
    if (fieldIndex === 1) {
      const month = parseInt(value, 10);
      if (isNaN(month) || month < 1) value = "01";
      else if (month > 12) value = "12";
    }
  
    // 일 보정
    if (fieldIndex === 2) {
      const month = parseInt(updatedActivities[index][type][1], 10) || 1;
      let maxDay = 31;
      if ([4, 6, 9, 11].includes(month)) maxDay = 30;
      else if (month === 2) maxDay = 29;
  
      const day = parseInt(value, 10);
      if (isNaN(day) || day < 1) value = "01";
      else if (day > maxDay) value = String(maxDay).padStart(2, "0");
    }
  
    updatedActivities[index][type][fieldIndex] = value;
    setActivities(updatedActivities);
  };
  
 


  const handleChange = (
    index: number,
    field: keyof ActivityData,
    value: string
  ) => {
    const updatedActivities = [...activities];
    
    updatedActivities[index][field] = value as never;
    setActivities(updatedActivities);
  
    if (field === "experienceDescription") {
      const lineCount = value.split("\n").length;
      setTextAreasRows((prev) =>
        prev.map((rows, idx) => (idx === index ? Math.min(lineCount, 5) : rows))
      );
    }
  };
  
  const handleDropdownToggle = (index: number) => {
    setIsDropdownOpen((prev) =>
      prev.map((open, idx) => (idx === index ? !open : false))
    );
  };

const handleDropdownSelect = (index: number, value: string) => {
  const updatedActivities = [...activities];

  const mappedValue = value;

  updatedActivities[index].experienceType = mappedValue;
  setActivities(updatedActivities);
  setIsDropdownOpen((prev) =>
    prev.map((open, idx) => (idx === index ? false : open))
  );
};

  return (
    <Container>
      {activities.map((activity, index) => (
        <ActivityBlock key={index}>
          <ContentContainer>
            <ActivityContainer focused={focusedIndex === index}>
              <Dropdown>
                <DropdownButton onClick={() => handleDropdownToggle(index)}>
                  {activity.experienceType}
                  <SlArrowDown style={{ marginLeft: "8px" }} />
                </DropdownButton>
                {isDropdownOpen[index] && (
                  <DropdownList>
                    {ActivityOptions.map((option) => (
                      <li key={option} onClick={() => handleDropdownSelect(index, option)}>
                        {option}
                      </li>
                    ))}
                  </DropdownList>
                )}
              </Dropdown>
              <Input
                placeholder="활동명을 적어주세요."
                value={activity.experienceName}
                onChange={(e) => handleChange(index, "experienceName", e.target.value)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
              />
            </ActivityContainer>
            <DateContainer focused={focusedDateIndex === index}>
              <Label>활동 기간</Label>
              <DateInputs>
              {activity.startDate.map((value, fieldIndex: number) => (
                <React.Fragment key={`start-${fieldIndex}`}>
                  <DateInput
                    type="text"
                    placeholder="00"
                    value={value}
                    ref={startRefs.current[index]?.[fieldIndex]}
                    onChange={(e) => handleDateChange(index, "startDate", fieldIndex, e.target.value)}
                    onFocus={() => setFocusedDateIndex(index)}
                    onBlur={() => {
                      setFocusedDateIndex(null);
                      handleDateBlur(index, "startDate", fieldIndex);
                    }}
                  />
                  {fieldIndex < 2 && <Dash>.</Dash>}
                </React.Fragment>
              ))}
              <div style={{ margin: "0 6px" }}>-</div>
              {activity.endDate.map((value, fieldIndex: number) => (
                <React.Fragment key={`end-${fieldIndex}`}>
                  <DateInput
                    type="text"
                    placeholder="00"
                    value={value}
                    ref={endRefs.current[index]?.[fieldIndex]}
                    onChange={(e) => handleDateChange(index, "endDate", fieldIndex, e.target.value)}
                    onFocus={() => setFocusedDateIndex(index)}
                    onBlur={() => {
                      setFocusedDateIndex(null);
                      handleDateBlur(index, "endDate", fieldIndex);
                    }}
                  />
                  {fieldIndex < 2 && <Dash>.</Dash>}
                </React.Fragment>
              ))}
              </DateInputs>
            </DateContainer>
          </ContentContainer>
          <TextArea
            placeholder="활동에서 경험한 것을 적어주세요!"
            rows={textAreasRows[index]}
            value={activity.experienceDescription}
            onChange={(e) => handleChange(index, "experienceDescription", e.target.value)}
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

export default Activity;
