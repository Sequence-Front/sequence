import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../asset/component/Header';
import { CommonButton } from '../components/CommonButton';
import { CommonInput } from '../components/CommonInput';
import * as S from '../style/CommonStyles';

export const Title = styled.div`
  font-size: clamp(2.5rem, 3vw, 3.5rem);
  font-weight: bold;
  color: #FFFFFF;
`;

const SubTitle = styled.p`
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  color: #ffffff;
  text-align: center;
  margin-bottom: clamp(4rem, 6vw, 8rem);
`;

const FindPasswordPage: React.FC = () => {
  const [formData, setFormData] = useState({
    userId: '',
    email: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { userId, email } = formData;
    setIsFormValid(userId !== '' && email !== '');
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Header headerName="비밀번호 찾기" />
      <S.Container>
        <Title>비밀번호 찾기</Title>
        <SubTitle>가입시 입력된 이메일로 임시 비밀번호가 발급됩니다.</SubTitle>
        <S.ContentWrapper>
          <S.CategoryTitle>회원정보</S.CategoryTitle>
          <S.FormSection>
            <S.FormGrid columns={2}>
              <CommonInput
                label="아이디"
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                placeholder="아이디를 입력해주세요."
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
            임시 비밀번호 발급
          </CommonButton>
        </S.ButtonWrapper>
      </S.Container>
    </>
  );
};

export default FindPasswordPage; 