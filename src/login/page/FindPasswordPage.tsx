//24-11-26 박승균
// {
//   email : "tmdrbs0925@gmail.com",
//   userId : "psg925"
// }

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../asset/component/Header';
import { CommonButton } from '../components/CommonButton';
import { CommonInput } from '../components/CommonInput';
import * as S from '../style/CommonStyles';
import { LoginButton, SignUpButton } from '../style/LoginStyle';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SubTitle = styled.p`
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  color: #ffffff;
  text-align: center;
  margin-bottom: clamp(2rem, 3vw, 4rem);
  width: 100%;
`;

const FindPasswordPage: React.FC = () => {
  const [formData, setFormData] = useState({
    userId: '',
    email: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = () => {
    if (!isFormValid) return;
    setShowResult(true);
  };

  return (
    <>
      <Header headerName="비밀번호 찾기" />
      <S.Container>
        <S.Title>비밀번호 찾기</S.Title>
        <S.FormContainer>
          {!showResult && (
            <SubTitle>가입시 입력된 이메일로 임시 비밀번호가 발급됩니다.</SubTitle>
          )}
          <S.ContentWrapper showResult={showResult}>
            {!showResult ? (
              <>
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
              </>
            ) : (
              <S.Result>
                <S.ResultText>회원 이메일로 임시 비밀번호가 발급되었습니다.</S.ResultText>
                <S.ResultContainer>
                  <S.IdText>{formData.email}</S.IdText>
                </S.ResultContainer>
                <LoginButton type="button" onClick={() => navigate('/login')}>로그인</LoginButton>
                <SignUpButton type="button" onClick={() => navigate('/findId')}>
                  아이디 찾기 <FaArrowRight />
                </SignUpButton>
              </S.Result>
            )}
          </S.ContentWrapper>
          {!showResult && (
            <S.ButtonWrapper>
              <CommonButton 
                isActive={isFormValid}
                onClick={handleSubmit}
              >
                임시 비밀번호 발급
              </CommonButton>
            </S.ButtonWrapper>
          )}
        </S.FormContainer>
      </S.Container>
    </>
  );
};

export default FindPasswordPage; 