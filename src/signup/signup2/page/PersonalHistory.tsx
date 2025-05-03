//2024-11-28 02:20 완성
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
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

const Input = styled.input`
  display: flex;
  width: 55%;
  background: #151515;
  padding: clamp(0.5rem, 1.2vw, 15px);
  padding-left: 0;
  font-size: clamp(10px, 1.2vw, 1.3rem);
  color: white;
  border: none;
  border-bottom: 1px solid #757575;
  margin-right: 20px;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #e0e0e0;
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


interface PersonalHistoryData {
  companyName: string;
  startDate: [string, string, string];
  endDate: [string, string, string];
  careerDescription: string;
}

interface PersonalHistoryProps {
  onDataChange: (data: PersonalHistoryData[]) => void;
}
const PersonalHistory = ({ onDataChange }: PersonalHistoryProps) => {
  const [activities, setActivities] = useState<PersonalHistoryData[]>([
    { companyName: "", startDate: ["", "", ""], endDate: ["", "", ""], careerDescription: "" },
  ]);

  const startRefs = useRef<Array<Array<React.RefObject<HTMLInputElement>>>>([]);
  const endRefs = useRef<Array<Array<React.RefObject<HTMLInputElement>>>>([]);
  const [focusedDateIndex, setFocusedDateIndex] = useState<number | null>(null);
  const [textAreasRows, setTextAreasRows] = useState<number[]>([1]);

  useEffect(() => {
    onDataChange(activities);
  }, [activities, onDataChange]);

  const handleAddActivity = () => {
    setActivities((prev) => [
      ...prev,
      { companyName: "", startDate: ["", "", ""], endDate: ["", "", ""], careerDescription: "" },
    ]);
    setTextAreasRows((prev) => [...prev, 1]);
    startRefs.current.push([React.createRef(), React.createRef(), React.createRef()]);
    endRefs.current.push([React.createRef(), React.createRef(), React.createRef()]);
  };

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
  

  const handleChange = (index: number, field: keyof PersonalHistoryData, value: string) => {
    const updatedActivities = [...activities];
    updatedActivities[index][field] = value as never;
    setActivities(updatedActivities);

    if (field === "careerDescription") {
      const lineCount = value.split("\n").length;
      setTextAreasRows((prev) =>
        prev.map((rows, idx) => (idx === index ? Math.min(lineCount, 5) : rows))
      );
    }
  };

  return (
    <Container>
      {activities.map((activity, index) => (
        <ActivityBlock key={index}>
          <ContentContainer>
            <Input
              placeholder="회사명을 적어주세요."
              value={activity.companyName}
              onChange={(e) => handleChange(index, "companyName", e.target.value)}
            />
            <DateContainer focused={focusedDateIndex === index}>
              <Label>근무 기간</Label>
              <DateInputs>
              {activity.startDate.map((value, fieldIndex) => (
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
              {activity.endDate.map((value, fieldIndex) => (
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
            placeholder="맡았던 직무와 업무를 적어주세요!!"
            rows={textAreasRows[index]}
            value={activity.careerDescription}
            onChange={(e) => handleChange(index, "careerDescription", e.target.value)}
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

export default PersonalHistory;
