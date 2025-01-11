// 2024-11-18 18:09 승균 작성
import React, { ReactNode } from 'react';
import { HistorySection as Section, HistoryTitle, HistoryContent } from '../styles/PersonalHistory.styles';
import HistoryItem from './HistoryItem';
import { HistoryItemType } from '../types/history.types';

interface HistorySectionProps {
  title: string;
  items: HistoryItemType[];
  children?: ReactNode;
}

const HistorySection = ({ title, items, children }: HistorySectionProps) => {
  return (
    <Section>
      <HistoryTitle>{title}</HistoryTitle>
      <HistoryContent>
        {children}
        {items.map((item, index) => (
          <HistoryItem key={index} item={item} />
        ))}
      </HistoryContent>
    </Section>
  );
};

export default HistorySection; 