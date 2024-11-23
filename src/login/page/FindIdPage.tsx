import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../asset/component/Header';
import { CommonButton } from '../components/CommonButton';
import { CommonInput } from '../components/CommonInput';
import * as S from '../style/CommonStyles';

const GenderContainer = styled.div`
  display: flex;
  align-items: flex-end; 
  gap: clamp(1rem, 2vw, 1.5rem);
  height: 100%; 
`;

const GenderButton = styled.button<{ isSelected: boolean }>`
  padding: clamp(0.1rem, 0.5vw, 0.2rem) clamp(0.2rem, 2vw, 1rem);
  border-radius: 20px;
  border: 1px solid #616161;
  background: ${props => props.isSelected ? '#212121' : 'transparent'};
  color: ${props => props.isSelected ? '#FFFFFF' : '#616161'};
  cursor: pointer;
  font-size: clamp(0.9rem, 1.5vw, 1.2rem);
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vw, 0.8rem);
`;

const Label = styled.div`
  font-size: clamp(1.5rem, 1.5vw, 2rem);
  color: #FFFFFF;
`;


const FindIdPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    phone: '',
    email: '',
    gender: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { name, birthDate, phone, email, gender } = formData;
    setIsFormValid(
      name !== '' && 
      birthDate !== '' && 
      phone !== '' && 
      email !== '' && 
      gender !== ''
    );
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    value = value.slice(0, 8);
    
    let formatted = '';
    if (value.length > 0) {
      formatted += value.substring(0, 4);
      if (value.length > 4) {
        formatted += '.' + value.substring(4, 6);
      }
      if (value.length > 6) {
        formatted += '.' + value.substring(6, 8);
      }
    }

    setFormData(prev => ({
      ...prev,
      birthDate: formatted
    }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  };

  return (
    <>
      <Header headerName="ID" />
      <S.Container>
        <S.Title>아이디 찾기</S.Title>
        <S.ContentWrapper>
          <S.CategoryTitle>회원 정보</S.CategoryTitle>
          <S.FormSection>
            <S.FormGrid columns={3}>
              <CommonInput
                label="이름"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름을 입력해주세요"
              />

              <CommonInput
                label="생년월일"
                type="text"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleBirthDateChange}
                placeholder="YYYY.MM.DD"
              />

              <InputBlock>
                <Label>성별</Label>
                <GenderContainer>
                <GenderButton
                  type="button"
                  isSelected={formData.gender === '남성'}
                  onClick={() => handleGenderSelect('남성')}
                >
                  남성
                </GenderButton>
                <GenderButton
                  type="button"
                  isSelected={formData.gender === '여성'}
                  onClick={() => handleGenderSelect('여성')}
                >
                  여성
                </GenderButton>
              </GenderContainer>
            </InputBlock>
          </S.FormGrid>

            <S.FormGrid columns={2}>
              <CommonInput
                label="휴대전화 번호"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="- 없이 입력하세요"
              />

              <CommonInput
                label="이메일"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="sequence@email.com"
              />
            </S.FormGrid>
          </S.FormSection>
        </S.ContentWrapper>

        <S.ButtonWrapper>
          <CommonButton isActive={isFormValid}>
            아이디 찾기
          </CommonButton>
        </S.ButtonWrapper>
      </S.Container>
    </>
  );
};

export default FindIdPage;
