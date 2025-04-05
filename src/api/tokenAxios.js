import axios from 'axios';

const API_URL = 'https://sequence.agong.store/';

const tokenAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'access': localStorage.getItem("accessToken"),
  },
    withCredentials: true
});

// 토큰 갱신 함수
const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}api/token`, {
      accessToken: localStorage.getItem("accessToken")
    }, {
      withCredentials: true // refreshToken이 쿠키에 있으므로 credentials 포함
    });
    
    // 새로운 토큰 저장
    const newAccessToken = response.headers['access'];
    localStorage.setItem("accessToken", newAccessToken);
    
    return newAccessToken;
  } catch (error) {
    // 리프레시 토큰도 만료된 경우
    if (error.response?.status === 40203) {
      alert("다시 로그인 해주세요!");
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
    throw error;
  }
};

// 응답 인터셉터
tokenAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 토큰 만료 에러이고, 재시도하지 않은 요청인 경우
    if (error.response?.status === 40202 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 토큰 갱신
        const newAccessToken = await refreshToken();
        
        // 새로운 토큰으로 헤더 업데이트
        tokenAxios.defaults.headers['access'] = newAccessToken;
        originalRequest.headers['access'] = newAccessToken;
        
        // 실패했던 요청 재시도
        return tokenAxios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default tokenAxios;