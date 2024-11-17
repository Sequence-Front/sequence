import React, { useState } from 'react';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: clamp(80px, 6vw, 100px);
  margin-top: clamp(40px, 4vw, 60px);
  
  @media (max-width: 768px) {
    width: 90%;
    margin-top: 30px;
  }
`;

const HistorySection = styled.div`
  display: flex;
  gap: clamp(40px, 4vw, 60px);
  align-items: flex-start;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const HistoryTitle = styled.div`
  min-width: clamp(160px, 12vw, 190px);
  font-size: clamp(21px, 2.1vw, 25px);
  font-weight: bold;
  color: #ffffff;
  flex-shrink: 0;
`;

const HistoryContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(40px, 3vw, 50px);
  border-bottom: 1px solid #9E9E9E;
  padding-bottom: clamp(40px, 3vw, 50px);
`;

const HistoryItem = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: clamp(20px, 2vw, 30px);
  border-bottom: 1px solid #9E9E9E;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ItemCategory = styled.span`
  color: #888;
  font-size: clamp(17px, 1.5vw, 19px);
  min-width: max-content;
`;

const Divider = styled.span`
  color: #888;
  font-size: clamp(14px, 1.2vw, 16px);
  display: flex;
  align-items: center;
  margin: 0 4px;
`;

const ItemPeriod = styled.div`
  color: #888;
  font-size: clamp(17px, 1.5vw, 19px);
  min-width: max-content;
`;

const ItemTitle = styled.div`
  font-size: clamp(19px, 1.9vw, 23px);
  font-weight: bold;
  min-width: max-content;
`;

const ItemDescription = styled.div`
  color: #ffffff;
  font-size: clamp(17px, 1.5vw, 19px);
  margin-top: 12px;
  padding-left: 0;
`;


const dummyData: HistoryDataType = {
  activities: [
    {
      title: "TS파트너즈 3기",
      category: "대외활동",
      period: "2022.06.~2023.01",
      description: "타이포그래피서울 TS파트너즈 3기로 활동하며 타이포그래피 포스터 및 리플릿 제작"
    },
    {
      title: "TS파트너즈 3기",
      category: "교육",
      period: "2022.06.~2023.01",
      description: "타이포그래피서울 TS파트너즈 3기로 활동하며 타이포그래피 포스터 및 리플릿 제작"
    },
    {
      title: "TS파트너즈 3기",
      category: "봉사활동",
      period: "2022.06.~2023.01",
      description: "타이포그래피서울 TS파트너즈 3기로 활동하며 타이포그래피 포스터 및 리플릿 제작"
    }
  ],
  career: [
    {
      title: "카카오",
      category: "인턴",
      period: "2022.06.~2023.01",
      description: "BX Designer"
    },
    {
      title: "Google",
      category: "외주",
      period: "2022.06.~2023.01",
      description: "타이포그래피서울 TS파트너즈 3기로 활동하며 타이포그래피 포스터 및 리플릿 제작"
    },
    {
      title: "Hyundai",
      category: "아르바이트",
      period: "2022.06.~2023.01",
      description: "Content Designer"
    }
  ],
  certification: [
    {
      title: "2종보통 운전면허",
      category: "",
      period: "2022.06.~2023.01"
    },
    {
      title: "TOEIC SPEAKING IM2",
      category: "",
      period: "2022.06.~2023.01"
    },
    {
      title: "GTQ 2급",
      category: "",
      period: "2022.06.~2023.01"
    }
  ]
};

type HistoryItemType = {
    title: string;
    category: string;
    period: string;
    description?: string;
  };
  
  type HistoryDataType = {
    activities: HistoryItemType[];
    career: HistoryItemType[];
    certification: HistoryItemType[];
  };

const PersonalHistory = () => {
  const [historyData, setHistoryData] = useState<HistoryDataType>(dummyData);

  return (
    <HistoryContainer>
      <HistorySection>
        <HistoryTitle>경험 및 활동이력</HistoryTitle>
        <HistoryContent>
          {historyData.activities.map((item, index) => (
            <HistoryItem key={index}>
              <div>
                <ItemHeader>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemCategory>{item.category}</ItemCategory>
                  <Divider>|</Divider>
                  <ItemPeriod>{item.period}</ItemPeriod>
                </ItemHeader>
                {item.description && <ItemDescription>{item.description}</ItemDescription>}
              </div>
            </HistoryItem>
          ))}
        </HistoryContent>
      </HistorySection>

      <HistorySection>
        <HistoryTitle>경력</HistoryTitle>
        <HistoryContent>
          {historyData.career.map((item, index) => (
            <HistoryItem key={index}>
              <div>
                <ItemHeader>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemCategory>{item.category}</ItemCategory>
                  <Divider>|</Divider>
                  <ItemPeriod>{item.period}</ItemPeriod>
                </ItemHeader>
                {item.description && <ItemDescription>{item.description}</ItemDescription>}
              </div>
            </HistoryItem>
          ))}
        </HistoryContent>
      </HistorySection>

      <HistorySection>
        <HistoryTitle>자격증</HistoryTitle>
        <HistoryContent>
          {historyData.certification.map((item, index) => (
            <HistoryItem key={index}>
              <div>
                <ItemHeader>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemCategory>{item.category}</ItemCategory>
                  <Divider>|</Divider>
                  <ItemPeriod>{item.period}</ItemPeriod>
                </ItemHeader>
                {item.description && <ItemDescription>{item.description}</ItemDescription>}
              </div>
            </HistoryItem>
          ))}
        </HistoryContent>
      </HistorySection>
    </HistoryContainer>
  );
};

export default PersonalHistory;