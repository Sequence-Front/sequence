import React from 'react';
import styled from 'styled-components';
import LogoImage from '../asset/image/LoginLogo.png';
import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #151515;
  color: #fff;
  padding: 20px;
`;

const Logo = styled.img`
  width: clamp(300px, 8vw, 300px);
  height: clamp(300px, 8vw, 300px);
  margin-bottom: clamp(15px, 3vw, 20px);
`;

const Title = styled.h1`
  font-size: clamp(60px, 3vw, 120px);
  margin-bottom: clamp(30px, 5vw, 40px);
  font-weight: normal;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputField = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border: none;
  background-color: #212121;
  color: #fff;
  font-size: clamp(16px, 2vw, 20px);
  font-weight: bold;
  text-align: center;
  min-height: 70px;
  box-sizing: border-box;
  
  &::placeholder {
    color: #757575;
    text-align: center;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const Link = styled(NavLink)`
  color: #BDBDBD;
  text-decoration: none;
  font-size: clamp(12px, 2vw, 14px);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #E51D1D;
  color: #000000;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: clamp(18px, 2vw, 25px);
  min-height: 70px;
  box-sizing: border-box;
`;

const SignUpButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: transparent;
  color: #E51D1D;
  border: 1px solid #E51D1D;
  cursor: pointer;
  font-size: clamp(18px, 2vw, 25px);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 70px;
  box-sizing: border-box;
`;

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
    try {
      const response = await axios.post('/api/login', formData);
      
      if (response.status === 200) {
        console.log('로그인 성공');
        // 로그인 성공 시 처리할 작업
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      console.log('로그인 실패');
    }
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
              <IoIosArrowForward />
            </Link>
            <Link to='/'>
              비밀번호 찾기
              <IoIosArrowForward />
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