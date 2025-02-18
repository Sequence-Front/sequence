import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCheckmark } from "react-icons/io5";
import { nickNameDupCheck } from "../../api/SignUpAPI";

const Container = styled.div`
  background-color: #151515;
  color: white;
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

const Title = styled.div`
  display: flex;
  align-self: flex-start;
  margin-bottom: clamp(1rem, 2vw, 1.6rem);
  font-family: 'Noto Sans';
  font-weight: bold;
  font-size: clamp(1rem, 2vw, 1.6rem);
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: clamp(1rem, 2vw, 2rem);
`;

const PhotoPreview = styled.label<{ imageUrl: string | null }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(10rem, 10vw, 20rem);
  height: clamp(10rem, 10vw, 20rem);
  background-color: #1e1e1e;
  border: 1px dashed ${(props) => (props.imageUrl ? "transparent" : "none")};
  border-radius: 5px;
  background-image: ${(props) => (props.imageUrl ? `url(${props.imageUrl})` : "none")};
  background-size: cover;
  background-position: center;
  cursor: pointer;

  input {
    display: none;
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const InputField = styled.div`
  display: flex;
  width: 73%;
  margin-right: 1rem;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  padding-bottom: 15px;
  padding-right: 40px;
  background: #151515;
  color: white;
  border: none;
  border-bottom: 1px solid #616161;
  font-size: clamp(10px, 1vw, 1.3rem);

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #e0e0e0;
  }
`;

const CharacterCount = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  padding-bottom: 18px;
  transform: translateY(-50%);
  font-size: clamp(10px, 1vw, 1.3rem);
  color: #9e9e9e;
`;

const ConfirmButton = styled.button<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  background-color: ${(props) => (props.active ? "#e32929" : "#424242")};
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};
  transition: background-color 0.3s;
  color: #212121;

  &:hover {
    background-color: ${(props) => (props.active ? "#ff7777" : "#424242")};
  }
`;

const ErrorMessage = styled.div`
  color: #E51D1D;
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
`;

interface ProfileProps {
  onDataChange: (data: { nickname: string; imageUrl: string | null; duplicateCheck: boolean }) => void;
}

const Profile = ({ onDataChange }: ProfileProps) => {
  const [nickname, setNickname] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [duplicateCheck, setDuplicateCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImageUrl(reader.result as string);
          onDataChange({ nickname, imageUrl: reader.result as string, duplicateCheck });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setDuplicateCheck(false); 
    setErrorMessage(""); 
    onDataChange({ nickname: e.target.value, imageUrl, duplicateCheck: false });
  };

  const handleConfirmClick = async () => {
    if (nickname.trim() === "") return;

    try {
      const result = await nickNameDupCheck(nickname);

      if (!result) {
        setDuplicateCheck(false);
        setErrorMessage("닉네임 중복 확인 중 오류가 발생했습니다.");
        return;
      }

      if (result.isDuplicate) {
        setDuplicateCheck(false);
        setErrorMessage(result.message);
      } else {
        setDuplicateCheck(true);
        setErrorMessage("");
      }

      onDataChange({ nickname, imageUrl, duplicateCheck: !result.isDuplicate });
    } catch (error) {
      setErrorMessage("닉네임 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <PhotoContainer>
        <Title>프로필 사진</Title>
        <PhotoPreview imageUrl={imageUrl}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {!imageUrl && (
            <DefaultPhotoComponent>
              <AiOutlinePlus strokeWidth={0.1} />
            </DefaultPhotoComponent>
          )}
        </PhotoPreview>
      </PhotoContainer>
      <InputContainer>
        <Title>별명</Title>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <InputField>
            <Input
              type="text"
              placeholder="사용할 별명을 입력해주세요."
              value={nickname}
              maxLength={10}
              onChange={handleNicknameChange}
            />
            <CharacterCount>{nickname.length}/10</CharacterCount>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </InputField>
          {duplicateCheck ? (
            <IoCheckmark size={"clamp(1.5rem, 3vw, 2.5rem)"} color="#e32929" />
          ) : (
            <ConfirmButton active={nickname.length > 0} onClick={handleConfirmClick}>
              중복확인
            </ConfirmButton>
          )}
        </div>
      </InputContainer>
    </Container>
  );
};

export default Profile;
