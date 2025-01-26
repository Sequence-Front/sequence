import styled from "styled-components"

export const Tag = styled.button<{ selected: boolean }>`
  all: unset;
  display: inline-block;
  padding: clamp(5px, 1vw, 8px) clamp(6px, 1vw, 10px);
  margin: clamp(5px, 1vw, 7px);
  margin-left: 0;
  font-size: clamp(0.7rem, 1.2vw, 1.1rem);
  background-color: ${(props) => (props.selected ? "red" : "#151515")};
  border: 1px solid ${(props) => (props.selected ? "red" : "white")};
  color: ${(props) => (props.selected ? "#151515" : "white")};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background: #777777;
  }
`

export const Title = styled.div`
  display: flex;
  font-family: 'SUIT';
  font-weight: 500;
  font-size: 1.2rem;
`