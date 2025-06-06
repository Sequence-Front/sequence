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
    console.log(accessToken);
    const nickname = response.data.data.nickname;
    const profile = response.data.data.profileImg;

    if (accessToken) {
      const expiresIn = 1000 * 60 * 60;
      const now = Date.now();
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('nickname', nickname);
      sessionStorage.setItem('profile', profile);
      sessionStorage.setItem('tokenExpiresAt', String(now + expiresIn));
      
      return true;
    }
    return false; 
    
  } catch (error) {
    console.error('로그인 에러:', error);
    return false; 
  }
}

export { login };