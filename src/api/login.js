import axiosInstance from "../utils/axiosConfig"

const login = async (data) => {
  try {
    const response = await axiosInstance.post('/api/login', data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      const accessToken = res.headers['Access'];
      console.log("accessToken : ", accessToken);
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      console.log('응답 헤더:', res.headers);
      console.log('응답 헤더:', res);
    });
    
    //   , data, {
    //   withCredentials: true,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // });
    
    // if (response.status === 200) {
    //   // access 헤더에서 token 가져오기
    //   const accessToken = response.headers.access;
    //   console.log("accessToken : ", accessToken);
    //   if (accessToken) {
    //     localStorage.setItem('accessToken', accessToken);
    //   }
    //   console.log('응답 헤더:', response.headers);
    //   console.log('응답 헤더:', response);
    // }
  } catch (error) {
    console.error('로그인 에러:', error);
  }
}

export { login };