//24-11-26 박승균
// {
// birthDate : "1999.09.25",
// email : "tmdrbs0925@gmail.com",
// gender : "남성",
// name : "박승균",
// phone : "01090362183"
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
import { GenderSelect } from '../../common/components/GenderSelect';
import { BirthDateInput } from '../../common/components/BirthDateInput';

const GenderContainer = styled.div`
  display: flex;
  align-items: flex-end; 
  gap: clamp(1rem, 2vw, 1.5rem);
  height: 100%; 
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vw, 0.8rem);
`;

const RegistrationDateText = styled.div`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: #9E9E9E;
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
  const [showResult, setShowResult] = useState(false);
  const [foundId, setFoundId] = useState({
    userId: '',
    registrationDate: ''
  });

  const navigate = useNavigate();

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

  const handleGenderSelect = (gender: string) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  };

  const handleSubmit = () => {
    if (!isFormValid) return;  // 폼이 유효하지 않으면 함수 실행 중단
    
    // 나중에 API 연동
    setFoundId({
      userId: 'sequence01',
      registrationDate: '24.01.01'
    });
    setShowResult(true);
  };

  return (
    <>
      <Header headerName="ID" />
      <S.Container>
        <S.Title>아이디 찾기</S.Title>
        <S.FormContainer>
          <S.ContentWrapper showResult={showResult}>
            {!showResult ? (
              <>
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

                    <BirthDateInput
                      value={formData.birthDate}
                      onChange={(value) => setFormData(prev => ({ ...prev, birthDate: value }))}
                      hasError={false}
                    />

                    <InputBlock>
                      <GenderContainer>
                        <GenderSelect
                          selectedGender={formData.gender}
                          onSelect={handleGenderSelect}
                        />
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
              </>
            ) : (
              <S.Result>
                <S.ResultText>{formData.name}님의 아이디</S.ResultText>
                <S.ResultContainer>
                  <S.IdText>{foundId.userId}</S.IdText>
                  <RegistrationDateText>가입 날짜 : {foundId.registrationDate}</RegistrationDateText>
                </S.ResultContainer>
                <LoginButton type="button" onClick={() => navigate('/login')}>로그인</LoginButton>
                <SignUpButton type="button" onClick={() => navigate('/findPassword')}>
                  비밀번호 찾기 <FaArrowRight />
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
                아이디 찾기
              </CommonButton>
            </S.ButtonWrapper>
          )}
        </S.FormContainer>
      </S.Container>
    </>
  );
};

export default FindIdPage;
