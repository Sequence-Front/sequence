import styled from 'styled-components';

interface ContentWrapperProps {
  showResult?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #151515;
`;

export const Title = styled.div`
  font-size: clamp(3rem, 3.5vw, 4rem);
  margin: clamp(4rem, 6vw, 8rem) 0;
  color: #FFFFFF;
  font-weight: bold;
`;

export const ContentWrapper = styled.div<ContentWrapperProps>`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  width: 70%;

  ${props => props.showResult && `
    display: flex;
    justify-content: center;
    width: 100%;
  `}
`;

export const CategoryTitle = styled.div`
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  color: #FFFFFF;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-left: clamp(2rem, 4vw, 4.5rem);
`;

export const FormGrid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: ${props => props.columns ? `repeat(${props.columns}, 1fr)` : 'repeat(3, 1fr)'};
  gap: clamp(1rem, 2vw, 1.5rem);
  width: 100%;
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vw, 0.8rem);
`;

export const Label = styled.div`
  font-size: clamp(1.5rem, 1.5vw, 2rem);
  color: #FFFFFF;
`;

export const Input = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid #616161;
  padding: clamp(0.5rem, 1vw, 0.8rem) 0;
  color: #FAFAFA;
  font-size: clamp(0.9rem, 1.5vw, 1.2rem);

  &:focus {
    outline: none;
    border-bottom: 1px solid #E0E0E0;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`; 


export const Result = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ResultContainer = styled.div`
  border: 1px solid #9E9E9E;
  display: inline-block;
  padding: 3rem;
  margin: 3rem auto;
  text-align: center;
`;

export const ResultText = styled.div`
  color: #FFFFFF;
  font-size: clamp(2rem, 1.5vw, 3rem);
  margin-bottom: 1rem;
`;

export const IdText = styled.div`
  font-size: clamp(1.5rem, 1.5vw, 2rem);
  color: #FFFFFF;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;