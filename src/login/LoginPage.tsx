import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

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
  SignUpButton,
  BlackBox
} from './style/LoginStyle';

import { login } from '../api/login';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginSuccess = await login(formData);
    
    if (loginSuccess) {
      navigate('/');
    } else {
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요.');
    }
  };

  return (
    <>
    <LoginContainer>
    <Logo src="/image/LoginLogo.png" alt="Login Logo" />
      <Title>Login</Title>
      <FormWrapper>
        <LoginForm onSubmit={handleSubmit}>
          <InputField 
            type="text" 
            placeholder="아이디를 입력해주세요." 
            name="username"
            value={formData.username}
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
            <Link to='/findId'>
              아이디찾기
              <IconWrapper>
              <IoIosArrowForward />
              </IconWrapper>
            </Link>
            <Link to='/findPassword'>
              비밀번호 찾기
              <IconWrapper>
              <IoIosArrowForward />
              </IconWrapper>
            </Link>
          </LinkWrapper>
          <LoginButton type="submit">로그인</LoginButton>
          <SignUpButton type="button" onClick={() => navigate('/signup')}>
            회원가입하기 <FaArrowRight />
          </SignUpButton>
        </LoginForm>
      </FormWrapper>
    </LoginContainer>
    <BlackBox />
    </>
  );
};

export default LoginPage;