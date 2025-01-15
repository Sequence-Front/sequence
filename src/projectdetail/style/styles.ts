import styled from 'styled-components';

export const Section = styled.div`
  margin-bottom: 3rem;
`;

export const SectionTitle = styled.div`
  color: #e32929;
  font-size: clamp(1.2rem, 1.5vw, 1.5rem);
  margin-bottom: 2rem;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  @media (max-width: 1200px) {
    gap: 4rem;
  }
`;

export const FirstColumn = styled.div`
  width: clamp(200px, 15vw, 300px);
  flex-shrink: 0;
`;

export const SecondColumn = styled.div`
  width: clamp(100px, 25vw, 180px);
  flex-shrink: 0;
`;

export const ThirdColumn = styled.div`
  flex: 1;
  max-width: 600px;
`;

export const LabelTitle = styled.div`
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
`;

export const ChipsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const ContentText = styled.div`
  margin-bottom: 2rem;
  color: #BDBDBD;
  font-size: clamp(0.9rem, 1vw, 1rem);
`;

export const Description = styled.p`
  line-height: 1.6;
  color: #BDBDBD;
  font-size: clamp(0.9rem, 1vw, 1rem);
`;

export const Tag = styled.div`
  display: inline-block;
  background-color: transparent;
  color: white;
  padding: 0.25rem 0.5rem;
  border: 1px solid white;
  border-radius: 20px;
  margin-right: 0.5rem;
  white-space: nowrap;
  font-size: clamp(0.8rem, 0.9vw, 1rem);
`;

export const DescriptionWrapper = styled.div`
  font-size: clamp(1.2rem, 1.4vw, 1.4rem);
`;