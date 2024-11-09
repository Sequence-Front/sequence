import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #151515;
  color: #fff;
  padding: 20px;
`;

export const Logo = styled.img`
  width: clamp(300px, 8vw, 300px);
  height: clamp(300px, 8vw, 300px);
  margin-bottom: clamp(15px, 3vw, 20px);
`;

export const Title = styled.h1`
  font-family: 'Alike', serif;
  font-size: clamp(60px, 3vw, 120px);
  margin-bottom: clamp(80px, 5vw, 40px);
  font-weight: bold;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputField = styled.input`
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

export const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: clamp(30px, 5vw, 40px);
  box-sizing: border-box;
`;

export const Link = styled(NavLink)`
  color: #BDBDBD;
  text-decoration: none;
  font-size: clamp(20px, 2vw, 14px);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const IconWrapper = styled.div`
  display: flex;
  font-size: clamp(25px, 2vw, 14px);
`;

export const LoginButton = styled.button`
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

export const SignUpButton = styled.button`
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