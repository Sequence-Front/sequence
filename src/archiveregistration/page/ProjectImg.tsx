import React, { useState, useEffect } from "react";
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
  font-size: 1.5rem;
`;

const PhotoPreview = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  overflow: hidden;

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
  font-size: 1.5rem;
  padding: 0;
  color: #e32929;
  cursor: pointer;
`;

interface ProjectImgProps {
  onDataChange: (data: { imageFiles: File[]; deletedDefaultUrls?: string[] }) => void;
  defaultUrls?: string[];
}

const ProjectImg = ({ onDataChange, defaultUrls = [] }: ProjectImgProps) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [defaultImageUrls, setDefaultImageUrls] = useState<string[]>(defaultUrls);
  const [deletedDefaultUrls, setDeletedDefaultUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const updatedImageFiles = [...imageFiles, ...files];
      setImageFiles(updatedImageFiles);
      onDataChange({ imageFiles: updatedImageFiles, deletedDefaultUrls });
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);
    onDataChange({ imageFiles: updatedFiles, deletedDefaultUrls });
  };

  const handleRemoveDefaultImage = (index: number) => {
    const removedUrl = defaultImageUrls[index];
    const updatedUrls = defaultImageUrls.filter((_, i) => i !== index);
    const updatedDeleted = [...deletedDefaultUrls, removedUrl];

    setDefaultImageUrls(updatedUrls);
    setDeletedDefaultUrls(updatedDeleted);
    onDataChange({ imageFiles, deletedDefaultUrls: updatedDeleted });
  };

  useEffect(() => {
    setDefaultImageUrls(defaultUrls);
  }, [defaultUrls]);
  

  return (
    <Container>
      <ImageGrid>
        {defaultImageUrls.map((url, index) => (
          <ImageContainer key={`default-${index}`}>
            <Image src={url} />
            <RemoveButton onClick={() => handleRemoveDefaultImage(index)}>
              <FiTrash />
            </RemoveButton>
          </ImageContainer>
        ))}
        {imageFiles.map((file, index) => (
          <ImageContainer key={`file-${index}`}>
            <Image src={URL.createObjectURL(file)} />
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
