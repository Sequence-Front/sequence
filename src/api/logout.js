import tokenAxios from "./tokenAxios";

export const postLogout = async () => {
  try {
    const response = await tokenAxios.post('/api/logout',null,{
      withCredentials: true
    }
  );
    return response;
  } catch (error) {
    console.error('로그아웃 에러', error);
    throw error;
  }
};
