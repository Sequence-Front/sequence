import styled from 'styled-components';

export const PortfolioContainer = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(20px, 2vw, 24px);
  margin-top: clamp(40px, 4vw, 60px);
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 90%;
  }
`;

export const ProjectCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: #757575;
  overflow: hidden;

  &:hover {
    .hover-overlay {
      opacity: 1;
    }
  }
`;

export const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #E32929;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 0 clamp(20px, 2vw, 24px);
`;

export const PageOpenText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  font-size: clamp(26px, 2.1vw, 30px);
  font-weight: bold;
  color: #000000;
  margin-bottom: clamp(10px, 3vw, 20px);
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StatusContainer = styled.div`
  position: absolute;
  top: clamp(12px, 1.5vw, 16px);
  left: clamp(12px, 1.5vw, 16px);
  display: flex;
  gap: clamp(6px, 0.8vw, 8px);
`;

export const StatusBadge = styled.span`
  padding: clamp(4px, 0.6vw, 6px) clamp(8px, 1vw, 12px);
  border-radius: clamp(16px, 2vw, 20px);
  background: transparent;
  border: 1px solid ${props => props.className?.includes('hover') ? '#000000' : '#9E9E9E'};
  color: ${props => props.className?.includes('hover') ? '#000000' : '#fff'};
  font-size: clamp(12px, 1.2vw, 14px);
`;

export const ProjectInfo = styled.div`
  padding: clamp(16px, 2vw, 20px) 0;
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1vw, 12px);
`;

export const ProjectTitle = styled.h3`
  font-size: clamp(19px, 2.1vw, 23px);
  font-weight: bold;
  color: #fff;
  margin: 0;
  line-height: 1.4;
`;

export const ProjectPeriod = styled.div`
  font-size: clamp(17px, 1.7vw, 19px);
  color: #fff;
`;

export const ProjectRole = styled.div`
  font-size: clamp(17px, 1.7vw, 19px);
  color: #fff;
`;