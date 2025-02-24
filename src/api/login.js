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
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      return true;
    }
    return false; 
    
  } catch (error) {
    console.error('로그인 에러:', error);
    return false; 
  }
}

export { login };