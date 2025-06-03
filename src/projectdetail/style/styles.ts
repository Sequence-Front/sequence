import styled from 'styled-components';

export const Section = styled.div`
  margin-bottom: 3rem;
`;

export const SectionTitle = styled.div`
  color: #e32929;
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const FirstColumn = styled.div`
  width: clamp(200px, 15vw, 300px);
  flex-shrink: 0;
`;

export const SecondColumn = styled.div`
  width: clamp(200px, 25vw, 300px);
  flex-shrink: 0;
  
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const ThirdColumn = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  
  @media (max-width: 1200px) {
    width: 100%;
    max-width: none;
  }
`;

export const LabelTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
`;

export const ContentText = styled.div`
  margin-bottom: 2rem;
  color: #BDBDBD;
  font-size: 1rem;
  width: 100%;
`;

export const ChipsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;
`;

export const Description = styled.p`
  line-height: 1.6;
  color: #BDBDBD;
  font-size: 1rem;
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
  font-size: 1rem;
`;

export const DescriptionWrapper = styled.div`
  font-size: 1.2rem;
`;