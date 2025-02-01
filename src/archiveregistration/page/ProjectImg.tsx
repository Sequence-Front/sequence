import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";

const Container = styled.div`
  background-color: #151515;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ShowInitial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectImgIntro = styled.div`
  display: flex;
  color: white;
  margin-bottom: clamp(2rem, 2.5vw, 3rem);
  text-align: center;
  font-size: clamp(16px, 1.5vw, 24px);
`;

const PhotoPreview = styled.label<{ imageUrl?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: none;
  cursor: pointer;
  overflow: hidden;
  ${(props) =>
    props.imageUrl
      ? `
        height: auto;
        aspect-ratio: auto;
      `
      : `
        height: clamp(180px, 17vw, 300px);
      `}

  input {
    display: none;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 0, 0, 0.7);
  }
`;

const DefaultPhotoComponent = styled.div`
  display: flex;
  width: 3rem;
  height: 3rem;
  border: 0.5px solid #e32929;
  background-color: #151515;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  padding: 0;
  color: #e32929;
  cursor: pointer;
`;

interface ProjectImgProps {
  onDataChange: (data: { imageUrls: string[] }) => void;
}

const ProjectImg = ({ onDataChange }: ProjectImgProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newImageUrls: string[] = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            newImageUrls.push(reader.result as string);
            if (newImageUrls.length === files.length) {
              const updatedUrls = [...imageUrls, ...newImageUrls];
              setImageUrls(updatedUrls);
              onDataChange({ imageUrls: updatedUrls });
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedUrls);
    onDataChange({ imageUrls: updatedUrls });
  };

  return (
    <Container>
      <ImageGrid>
        {imageUrls.map((url, index) => (
          <ImageContainer key={index}>
            <Image src={url} alt={`Uploaded ${index}`} />
            <RemoveButton onClick={() => handleRemoveImage(index)}>
              <FiTrash />
            </RemoveButton>
          </ImageContainer>
        ))}
      </ImageGrid>
      <PhotoContainer>
        <PhotoPreview>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} />
          <ShowInitial>
            <ProjectImgIntro>프로젝트 이미지 추가하기</ProjectImgIntro>
            <DefaultPhotoComponent>
              <AiOutlinePlus strokeWidth={0.1} />
            </DefaultPhotoComponent>
          </ShowInitial>
        </PhotoPreview>
      </PhotoContainer>
    </Container>
  );
};

export default ProjectImg;
