// 2024-11-18 18:09 승균 작성
import React from 'react';
import styled from 'styled-components';
import { ItemHeader, ItemTitle, ItemCategory, ItemPeriod, ItemDescription } from '../styles/PersonalHistory.styles';
import { HistoryItemType } from '../types/history.types';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: clamp(20px, 2vw, 30px);
  border-bottom: 1px solid #9E9E9E;
  
  &:last-child {

  }
`;

interface HistoryItemProps {
  item: HistoryItemType;
}

const HistoryItem = ({ item }: HistoryItemProps) => {
  return (
    <ItemContainer>
      <ItemHeader>
        <ItemCategory>{item.category}</ItemCategory>
        <ItemTitle>{item.title}</ItemTitle>
        <ItemPeriod>{item.period}</ItemPeriod>
      </ItemHeader>
      {item.description && <ItemDescription>{item.description}</ItemDescription>}
    </ItemContainer>
  );
};

export default HistoryItem; 