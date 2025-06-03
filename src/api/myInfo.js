import tokenAxios from "./tokenAxios";

export const getMyInfo = async () => {
    const params = new URLSearchParams(window.location.search);
    const nickname = params.get('nickname');
    const storedNickname = sessionStorage.getItem('nickname');
    
    try {
        const accessToken = sessionStorage.getItem('accessToken');

        if (!accessToken) {
            throw new Error("로그인 다시");
        }

        const endpoint =
        nickname && nickname !== "undefined" && nickname !== storedNickname ? `/api/mypage/${nickname}` : `/api/mypage`;
        
        const response = await tokenAxios.get(endpoint);
        console.log(response)

        if (response.status === 200) {
            return response.data.data;
        }
        throw new Error("에러임");
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return { isDuplicate: true, message: '없음' };
        }
        return { isDuplicate: true, message: '서버와의 연결이 잘안됩니다.' };
    }
};