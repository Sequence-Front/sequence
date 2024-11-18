import React from 'react';
import styled from 'styled-components';

export type DataItem = {
  label: string;
  value: number;
  profile: string;
  content: string;
}

type EvaluationBarProps = {
  item: DataItem;
  maxValue: number;
}

const BarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: none;
`

const BarWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: #212121;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 0.8rem;
`

const BarFill = styled.div<{ width: number }>`
  display: flex;
  width: ${(props) => props.width}%;
  background-color: #616161;
  align-items: center;
  padding: 0.3rem;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
`

const ProfileImage = styled.img`
  display: flex;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-left: 1rem;
  margin-right: 2rem;
`

const BarValue = styled.div`
  display: flex;
  color: #ff9393;
  font-size: 1.4rem;
  font-weight: bold;
  margin-right: 1rem;
`

export const GrayBar = styled.div`
  width: 100%;
  height: 1.5rem;
  background: linear-gradient(to bottom, #212121, #21212100);
  margin: 0.5rem auto;
`


export const MemberSummaryComponent = ({item, maxValue}: EvaluationBarProps) => {
  return (
    <BarContainer>
    <BarWrapper>
      <BarFill width={(item.value / maxValue) * 100}>
        <ProfileImage src={item.profile} alt="프로필 이미지" />
        {item.label}
      </BarFill>
      <BarValue>{item.value}</BarValue>
    </BarWrapper>
  </BarContainer>
  );
};
