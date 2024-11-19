// 2024-11-18 18:09 승균 작성
import styled from 'styled-components';

export const HistoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(80px, 6vw, 100px);
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    width: 90%;
    margin-top: 30px;
  }
`;

export const HistorySection = styled.div`
  display: flex;
  gap: clamp(40px, 4vw, 60px);
  align-items: flex-start;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const HistoryTitle = styled.div`
  min-width: clamp(160px, 12vw, 190px);
  font-size: clamp(21px, 2.1vw, 25px);
  font-weight: bold;
  color: #ffffff;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 30px;
  }
`;

export const HistoryContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(40px, 3vw, 50px);
  padding-bottom: clamp(40px, 3vw, 50px);
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const HistoryItem = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: clamp(20px, 2vw, 30px);
  border-bottom: 1px solid #9E9E9E;
  
  &:last-child {
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ItemCategory = styled.span`
  color: #888;
  font-size: clamp(17px, 1.5vw, 19px);
  min-width: max-content;
`;

export const Divider = styled.span`
  color: #888;
  font-size: clamp(14px, 1.2vw, 16px);
  display: flex;
  align-items: center;
  margin: 0 4px;
`;

export const ItemPeriod = styled.div`
  color: #888;
  font-size: clamp(17px, 1.5vw, 19px);
  min-width: max-content;
`;

export const ItemTitle = styled.div`
  font-size: clamp(19px, 1.9vw, 23px);
  font-weight: bold;
  min-width: max-content;
`;

export const ItemDescription = styled.div`
  color: #ffffff;
  font-size: clamp(17px, 1.5vw, 19px);
  margin-top: 12px;
  padding-left: 0;
`;