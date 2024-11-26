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
import * as S from './style/SignUpPageStyle';
import { SignUpInput } from './component/SignUpInput';
import { BirthDateInput } from '../common/components/BirthDateInput';

const PageNumber = styled.div`
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

const SignUpPage: React.FC = () => {
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
    
    // 중복체크 검증
    if (!duplicateChecks.email) {
      newFieldErrors.email = true;
      setErrorMessage('이메일 중복확인을 해주세요.');
      setFieldErrors(newFieldErrors);
      return false;
    }

    if (!duplicateChecks.userId) {
      newFieldErrors.userId = true;
      setErrorMessage('아이디 중복확인을 해주세요.');
      setFieldErrors(newFieldErrors);
      return false;
    }

    // 비밀번호 검증
    if (formData.password.length < 8 || formData.password.length > 20) {
      newFieldErrors.password = true;
      setErrorMessage('비밀번호는 8~20자 이내로 입력해주세요.');
      setFieldErrors(newFieldErrors);
      return false;
    }

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
    setErrorMessage(''); // 에러 메시지 초기화
    
    if (validateForm()) {
      // 다음 페이지로 이동
      navigate('/signup/step2', { state: formData });
    }
  };

  return (
    <>
      <Header headerName="SignUp" />
      <S.Container>
        <S.Title>회원가입</S.Title>
        <PageNumber>1/2</PageNumber>
        <S.FormContainer>
          <S.Section>
            <S.CategoryTitle>기본 정보</S.CategoryTitle>
            <S.FormSection>
              <S.FormGrid columns={3}>
                <SignUpInput
                  label="이름"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="이름을 입력해주세요."
                  hasError={fieldErrors.name}
                />
                <BirthDateInput
                  value={formData.birthDate}
                  onChange={(value) => setFormData(prev => ({ ...prev, birthDate: value }))}
                  hasError={fieldErrors.birthDate}
                />
                <GenderSelect
                  selectedGender={formData.gender}
                  onSelect={handleGenderSelect}
                />
              </S.FormGrid>
              <S.FormGrid columns={2}>
                <SignUpInput
                  label="휴대전화 번호"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="- 없이 입력하세요"
                  hasError={fieldErrors.phone}
                />
                <SignUpInput
                  label="이메일"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="sequence@email.com"
                  hasError={fieldErrors.email}
                  showDuplicateCheck
                  isDuplicateCheckActive={isDuplicateEmailCheckActive}
                  isDuplicateChecked={duplicateChecks.email}
                  onDuplicateCheck={handleEmailDuplicateCheck}
                />
              </S.FormGrid>
              <SignUpInput
                label="주소지"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="서울특별시 XX구 주소로 2039"
                hasError={fieldErrors.address}
              />
            </S.FormSection>
          </S.Section>

          <S.Section>
            <S.CategoryTitle>로그인</S.CategoryTitle>
            <S.FormSection>
              <SignUpInput
                label="아이디"
                description="4~10자 이내"
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                placeholder="아이디를 입력해주세요."
                hasError={fieldErrors.userId}
                showDuplicateCheck
                isDuplicateCheckActive={isDuplicateIdCheckActive}
                isDuplicateChecked={duplicateChecks.userId}
                onDuplicateCheck={handleIdDuplicateCheck}
              />
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

export default SignUpPage;