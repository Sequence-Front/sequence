//2024-11-28 02:20 정준용완성
import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #151515;
  color: white;
  width: 100%;
  gap: 20px;
`

const UploadContainer = styled.div<{ focused: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #212121;
  color: #9e9e9e;
  font-size: clamp(10px, 1.2vw, 1.3rem);
  padding: clamp(0.5rem, 1vw, 15px);
  border: ${(props) => (props.focused ? "1px solid #757575" : "none")};
  box-shadow: ${(props) => (props.focused ? "1px #757575" : "none")};
  transition: border 0.3s, box-shadow 0.3s;
`

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  font-size: clamp(10px, 1.2vw, 1.3rem);
  color: white;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
    color: white;
  }
`

const FileDetails = styled.div`
  display: flex;
  align-items: center;
  font-size: clamp(10px, 1.2vw, 1.3rem);
  color: #9e9e9e;

  span {
    margin-right: 10px;
  }
`

const UploadButton = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #e32929;
  font-size: clamp(14px, 1.5vw, 30px);

  &:hover {
    color: #ff5555;
  }

  input {
    display: none;
  }
`

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: #e32929;

  svg {
    font-size: 24px;
  }

  &:hover {
    color: #ff5555;
  }
`

const PortfolioBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

interface PortfolioProps {
  onDataChange: (
    data: { id: number; fileName: string | null; fileSize: number | null; url: string }[]
  ) => void;
}

const Portfolio = ({onDataChange}:PortfolioProps) => {
  const [portfolios, setPortfolios] = useState<
    { id: number; fileName: string | null; fileSize: number | null; url: string }[]
  >([
    { id: 1, fileName: null, fileSize: null, url: "" },
  ]);

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileSizeInMB = file.size / 1024 / 1024;
      setPortfolios((prev) => {
        const updatedPortfolios = prev.map((portfolio, idx) =>
          idx === index
            ? { ...portfolio, fileName: file.name, fileSize: fileSizeInMB, url: "" }
            : portfolio
        );
        onDataChange(updatedPortfolios); 
        return updatedPortfolios;
      });
    }
  };

  const handleUrlChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setPortfolios((prev) =>
      prev.map((portfolio, idx) =>
        idx === index ? { ...portfolio, url: event.target.value, fileName: null, fileSize: null } : portfolio
      )
    );
  };

  const addPortfolioBlock = () => {
    setPortfolios((prev) => [
      ...prev,
      { id: prev.length + 1, fileName: null, fileSize: null, url: "" },
    ]);
  };

  return (
    <Container>
      {portfolios.map((portfolio, index) => (
        <PortfolioBlock key={portfolio.id}>
          <UploadContainer focused={focusedIndex === index}>
            <Input
              type="text"
              placeholder="포트폴리오 업로드 또는 URL을 입력해주세요."
              value={
                portfolio.fileName
                  ? portfolio.fileName
                  : portfolio.url
              }
              onChange={(e) => handleUrlChange(index, e)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
            />
            <FileDetails>
              <span>
                {portfolio.fileSize !== null ? `${portfolio.fileSize.toFixed(2)}MB/50MB` : `0MB/50MB`}
              </span>
              <UploadButton htmlFor={`file-upload-${portfolio.id}`}>
               <BsUpload />
                <input
                  id={`file-upload-${portfolio.id}`}
                  type="file"
                  onChange={(e) => handleFileChange(index, e)}
                />
              </UploadButton>
            </FileDetails>
          </UploadContainer>
        </PortfolioBlock>
      ))}
      <AddButton >
        <AiOutlinePlus onClick={addPortfolioBlock} style={{ border: "1px solid red", padding: "5px", cursor: "pointer" }} />
      </AddButton>
    </Container>
  );
};

export default Portfolio;
