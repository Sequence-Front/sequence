import tokenAxios from "./axiosInstance";

export const getReport = async (targetType, targetId) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error("로그인이 필요합니다.");
    }
  
    try {
      const response = await tokenAxios.get(
        `/api/report/target/${targetType}/${targetId}`,
        {
          headers: {
            access: accessToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("신고 대상 조회 실패:", error);
  
      if (error.response) {
        throw new Error(error.response.data?.message || '신고 대상 조회 중 오류가 발생했습니다.');
      }
  
      throw new Error('서버와의 연결이 원활하지 않습니다.');
    }
  };

export const postReport = async (data) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await tokenAxios.post(`/api/report`, data, {
        headers: {
          access: accessToken,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('신고 요청 실패:', error);
      throw error; 
    }
  };