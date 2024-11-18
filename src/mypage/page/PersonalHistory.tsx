// 2024-11-18 18:09 승균 작성
import React, { useState } from 'react';
import { HistoryContainer } from '../styles/PersonalHistory.styles';
import HistorySection from '../component/HistorySection';
import { HistoryDataType } from '../types/history.types';
import { dummyData } from '../data/dummyData';

const PersonalHistory = () => {
  const [historyData, setHistoryData] = useState<HistoryDataType>(dummyData);

  return (
    <HistoryContainer>
      <HistorySection title="경험 및 활동이력" items={historyData.activities} />
      <HistorySection title="경력" items={historyData.career} />
      <HistorySection title="자격증" items={historyData.certification} />
    </HistoryContainer>
  );
};

export default PersonalHistory; 