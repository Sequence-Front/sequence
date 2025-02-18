import axiosInstance from "../utils/axiosConfig"

const login = async (data) => {

  try {
    const response = await axiosInstance.post('/api/login', data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      const accessToken = res.headers['access'];
      console.log("accessToken : ", accessToken);
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      console.log('응답 헤더:', res.headers);
      console.log('응답 헤더:', res);
    });
  } catch (error) {
    console.error('로그인 에러:', error);
  }
}

export { login };