import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";

const Container = styled.div`
  background-color: #151515;
  color: white;
  display: flex;
  align-items: flex-start;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: clamp(1rem, 2vw, 2rem);
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
  font-size: clamp(16px, 1.5vw, 24px);
`;

const PhotoPreview = styled.label<{ imageUrl: string | null }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(600px, 56vw, 990px);
  background-color: #1e1e1e;
  cursor: pointer;
  overflow: hidden;

  input {
    display: none;
  }

  ${(props) =>
    props.imageUrl
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

interface ThumbnailProps {
  onDataChange: (data: { imageUrl: string | null }) => void;
}

const Thumbnail = ({ onDataChange }: ThumbnailProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImageUrl(reader.result as string);
          onDataChange({ imageUrl: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <PhotoContainer>
        <PhotoPreview imageUrl={imageUrl}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {imageUrl ? (
            <Image src={imageUrl} alt="썸네일 미리보기" />
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
