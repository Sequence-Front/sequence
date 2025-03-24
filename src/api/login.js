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
    const nickname = response.data.data.nickname;
    const profile = response.data.data.profileImg;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('profile', profile);
      console.log(localStorage.getItem('accessToken')); // 액세스 토큰 출력
console.log(localStorage.getItem('nickname')); // 닉네임 출력
console.log(localStorage.getItem('profile')); // 프로필 이미지 URL 출력

      return true;
    }
    return false; 
    
  } catch (error) {
    console.error('로그인 에러:', error);
    return false; 
  }
}

export { login };