import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  background-color: #121212;
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
  padding-bottom: 10px;
  padding-top: 10px;
  margin-right: 20px;
  border: none;
  border-bottom: 1px solid #757575;
  background: #121212;
  color: white;

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
  font-size: 14px;
  color: white;
  margin-right: 2rem;
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
  width: 1rem;
  background: #121212;
  font-size: 14px;
  color: white;
  border: none;
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
  background: #121212;
  color: white;
  border: none;
  border-bottom: 1px solid #757575;
  margin-top: 10px;
  resize: none;
  padding-bottom: 10px;

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
  name: string;
  startDate: [string, string, string];
  endDate: [string, string, string];
  description: string;
}

interface PersonalHistoryProps {
  onDataChange: (data: PersonalHistoryData[]) => void;
}
const PersonalHistory = ({ onDataChange }: PersonalHistoryProps) => {
  const [activities, setActivities] = useState<PersonalHistoryData[]>([
    { name: "", startDate: ["", "", ""], endDate: ["", "", ""], description: "" },
  ]);

  const startRefs = useRef<Array<Array<React.RefObject<HTMLInputElement>>>>([]);
  const endRefs = useRef<Array<Array<React.RefObject<HTMLInputElement>>>>([]);
  const [focusedDateIndex, setFocusedDateIndex] = useState<number | null>(null);
  const [textAreasRows, setTextAreasRows] = useState<number[]>([1]);

  // 부모 컴포넌트에 데이터 전달
  useEffect(() => {
    onDataChange(activities);
  }, [activities, onDataChange]);

  const handleAddActivity = () => {
    setActivities((prev) => [
      ...prev,
      { name: "", startDate: ["", "", ""], endDate: ["", "", ""], description: "" },
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
    let newValue = value.replace(/[^0-9]/g, "");

    if (fieldIndex === 1 && parseInt(newValue, 10) > 12) {
      newValue = "12";
    }
    if (fieldIndex === 2 && parseInt(newValue, 10) > 31) {
      newValue = "31";
    }

    updatedActivities[index][type][fieldIndex] = newValue.slice(0, 2);
    setActivities(updatedActivities);
  };

  const handleChange = (index: number, field: keyof PersonalHistoryData, value: string) => {
    const updatedActivities = [...activities];
    updatedActivities[index][field] = value as never;
    setActivities(updatedActivities);

    if (field === "description") {
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
              value={activity.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
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
                    onBlur={() => setFocusedDateIndex(null)}
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
                    onBlur={() => setFocusedDateIndex(null)}
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

export default PersonalHistory;
