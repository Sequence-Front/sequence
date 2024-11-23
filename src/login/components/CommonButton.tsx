import styled from 'styled-components';

export const CommonButton = styled.button<{ isActive: boolean }>`
  min-width: 25%;
  padding: clamp(0.8rem, 1.5vw, 1.2rem) clamp(2rem, 3vw, 4rem);
  margin-top: clamp(7rem, 12vw, 12rem);
  border: none;
  border-radius: 4px;
  background: ${props => props.isActive ? '#E51D1D' : '#212121'};
  color: ${props => props.isActive ? '#212121' : '#616161'};
  font-size: clamp(1.5rem, 1.5vw, 2rem);
  font-weight: bold;
  cursor: ${props => props.isActive ? 'pointer' : 'default'};
  white-space: nowrap;
`; 