import axiosInstance from "../utils/axiosConfig"

const login = async (data) => {

  try {
    const response = await axiosInstance.post('/api/login', data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const accessToken = response.headers['access'];
    const nickname = response.data.nickname;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('nickname', nickname);
      return true;
    }
    return false; 
    
  } catch (error) {
    console.error('로그인 에러:', error);
    return false; 
  }
}

export { login };