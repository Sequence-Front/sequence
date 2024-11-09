import React from 'react';
import LogoImage from '../asset/image/LoginLogo.png';

import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

import axios from 'axios';
import { useState } from 'react';
import { 
  LoginContainer, 
  Logo, 
  Title, 
  FormWrapper,
  LoginForm, 
  InputField, 
  LinkWrapper, 
  Link, 
  IconWrapper, 
  LoginButton, 
  SignUpButton } from './style/LoginStyle';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post('/api/login', formData);
      
    //   if (response.status === 200) {
    //     console.log('로그인 성공');
    //     // 로그인 성공 시 처리할 작업
    //   }
    // } catch (error) {
    //   console.error('로그인 에러:', error);
    //   console.log('로그인 실패');
    // }
  };

  return (
    <LoginContainer>
      <Logo src={LogoImage} alt="Login Logo" />
      <Title>Login</Title>
      <FormWrapper>
        <LoginForm onSubmit={handleSubmit}>
          <InputField 
            type="text" 
            placeholder="아이디를 입력해주세요." 
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />
          <InputField 
            type="password" 
            placeholder="비밀번호를 입력해주세요." 
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <LinkWrapper>
            <Link to='/'>
              아이디찾기
              <IconWrapper>
              <IoIosArrowForward />
              </IconWrapper>
            </Link>
            <Link to='/'>
              비밀번호 찾기
              <IconWrapper>
              <IoIosArrowForward />
              </IconWrapper>
            </Link>
          </LinkWrapper>
          <LoginButton type="submit">로그인</LoginButton>
          <SignUpButton type="button">
            회원가입하기 <FaArrowRight />
          </SignUpButton>
        </LoginForm>
      </FormWrapper>
    </LoginContainer>
  );
};

export default LoginPage;