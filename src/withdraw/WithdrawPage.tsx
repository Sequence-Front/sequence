//24-11-26 박승균
// {
// address : "서울시 여러분 담배꽁초",
// birthDate : "1999.09.25",
// email : "tmdrbs0925@gmail.com",
// gender : "남성",
// name : "박승균",
// password : "qwer1234",
// passwordConfirm : "qwer1234",
// phone : "01090362183",
// userId : "psg925"
// }

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../asset/component/Header';
import { CommonButton } from '../login/components/CommonButton';
import { GenderSelect } from '../common/components/GenderSelect';
import * as S from '../signup/style/SignUpPageStyle';
import { SignUpInput } from '../signup/component/SignUpInput';
import { BirthDateInput } from '../common/components/BirthDateInput';

export const PageNumber = styled.div`
  font-size: clamp(1.5rem, 1.5vw, 2rem);
  color: #8f8f8f;
  margin-bottom: clamp(4rem, 6vw, 8rem);
`;

const ErrorMessage = styled.div`
  color: #E51D1D;
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  text-align: center;
  margin-bottom: 1.5rem;
`;

const WithdrawPage: React.FC = () => {
  const [formData, setFormData] = useState({
    // 기본 정보
    name: '',
    birthDate: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    // 로그인 정보
    userId: '',
    password: '',
    passwordConfirm: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isDuplicateIdCheckActive, setIsDuplicateIdCheckActive] = useState(false);
  const [isDuplicateEmailCheckActive, setIsDuplicateEmailCheckActive] = useState(false);
  const [duplicateChecks, setDuplicateChecks] = useState({
    userId: false,
    email: false
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const { userId, password, passwordConfirm, name, birthDate, gender, phone, email, address } = formData;
    setIsFormValid(
      userId !== '' && 
      password !== '' && 
      passwordConfirm !== '' &&
      name !== '' &&
      birthDate !== '' &&
      gender !== '' &&
      phone !== '' &&
      email !== '' &&
      address !== ''
    );
    setIsDuplicateIdCheckActive(userId.length > 0);
    setIsDuplicateEmailCheckActive(email.length > 0);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 이메일이나 아이디가 변경되면 해당 중복체크 상태를 초기화
    if (name === 'email') {
      setDuplicateChecks(prev => ({
        ...prev,
        email: false
      }));
    }
    if (name === 'userId') {
      setDuplicateChecks(prev => ({
        ...prev,
        userId: false
      }));
    }
  };

  const handleGenderSelect = (gender: string) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  };

  const handleIdDuplicateCheck = () => {
    if (isDuplicateIdCheckActive) {
      // API 호출 로직이 들어갈 자리
      // 중복 체크 후 중복이면 true, 아니면 false
      // {
      //   userId : "psg925"
      // }
      setDuplicateChecks(prev => ({
        ...prev,
        userId: true
      }));
    }
  };

  const handleEmailDuplicateCheck = () => {
    if (isDuplicateEmailCheckActive) {
      // API 호출 로직이 들어갈 자리
      // 중복 체크 후 중복이면 true, 아니면 false
      // {
      //   email : "tmdrbs0925@gmail.com"
      // }
      
      setDuplicateChecks(prev => ({
        ...prev,
        email: true
      }));
    }
  };

  const validateForm = () => {
    const newFieldErrors: Record<string, boolean> = {};

    // 비밀번호 일치 검증
    if (formData.password !== formData.passwordConfirm) {
      newFieldErrors.password = true;
      newFieldErrors.passwordConfirm = true;
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      setFieldErrors(newFieldErrors);
      return false;
    }

    setFieldErrors({});
    setErrorMessage('');
    return true;
  };

  const handleNext = () => {
    //모든 곳에 값이 입력되어 있지 않으면 return
    if (!isFormValid) {
      return;
    }
    
    setErrorMessage(''); // 에러 메시지 초기화
    
    if (validateForm()) {
      // 다음 페이지로 이동
      navigate('/signup2', { state: formData });
    }
  };

  return (
    <>
      <Header headerName="SignUp" />
      <S.Container>
        <S.Title>회원탈퇴</S.Title>
        <S.FormContainer>
          <S.Section>
            <S.CategoryTitle>비밀번호 입력</S.CategoryTitle>
            <S.FormSection>
              <SignUpInput
                label="비밀번호"
                description="영어, 숫자 포함 8~20자 이내"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력해주세요."
                hasError={fieldErrors.password}
              />
              <SignUpInput
                label="비밀번호 확인"
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
                placeholder="비밀번호를 한번 더 입력해주세요"
                hasError={fieldErrors.passwordConfirm}
              />
            </S.FormSection>
          </S.Section>

          <S.ButtonWrapper>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <CommonButton 
              isActive={isFormValid}
              onClick={handleNext}
            >
              다음
            </CommonButton>
          </S.ButtonWrapper>
        </S.FormContainer>
      </S.Container>
    </>
  );
};

export default WithdrawPage;