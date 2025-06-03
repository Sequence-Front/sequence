import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #151515;
  color: white;
  align-items: flex-start;
`;

const PhotoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const ShowInitial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ThumbnailIntro = styled.div`
  display: flex;
  color: white;
  margin-bottom: clamp(2rem, 2.5vw, 3rem);
  text-align: center;
  font-size: 1.5rem;
`;

const PhotoPreview = styled.label<{ imageFile: File | null }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #1e1e1e;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  input {
    display: none;
  }

  ${(props) =>
    props.imageFile
      ? `
        height: auto;
        aspect-ratio: auto;
      `
      : `
        height: clamp(350px, 35vw, 641px);
      `}
`;

const Image = styled.img`
  width: 100%;
  height: auto;
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

interface ThumbnailProps {
  onDataChange: (data: { imageFile: File | null; deletedDefault?: boolean }) => void;
  defaultUrl?: string;
}

const Thumbnail = ({ onDataChange, defaultUrl }: ThumbnailProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultUrl || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      onDataChange({ imageFile: file });
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    onDataChange({ imageFile: null, deletedDefault: true });
  };

  useEffect(() => {
    if (defaultUrl && !imageFile) {
      setPreviewUrl(defaultUrl);
    }
  }, [defaultUrl, imageFile]);

  return (
    <Container>
      <PhotoContainer>
        <PhotoPreview imageFile={imageFile}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl ? (
            <>
              <Image src={previewUrl} />
              <RemoveButton type="button" onClick={handleRemoveImage}>
                <FiTrash />
              </RemoveButton>
            </>
          ) : (
            <ShowInitial>
              <ThumbnailIntro>썸네일을 등록해주세요.</ThumbnailIntro>
              <DefaultPhotoComponent>
                <AiOutlinePlus strokeWidth={0.1} />
              </DefaultPhotoComponent>
            </ShowInitial>
          )}
        </PhotoPreview>
      </PhotoContainer>
    </Container>
  );
};

export default Thumbnail;
