// 2024-11-18 18:09 승균 작성
import React from 'react';
import { HistorySection as Section, HistoryTitle, HistoryContent } from '../styles/PersonalHistory.styles';
import HistoryItem from './HistoryItem';
import { HistoryItemType } from '../types/history.types';

interface HistorySectionProps {
  title: string;
  items: HistoryItemType[];
}

const HistorySection = ({ title, items }: HistorySectionProps) => {
  return (
    <Section>
      <HistoryTitle>{title}</HistoryTitle>
      <HistoryContent>
        {items.map((item, index) => (
          <HistoryItem key={index} item={item} />
        ))}
      </HistoryContent>
    </Section>
  );
};

export default HistorySection; 