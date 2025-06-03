import axiosInstance from "./axiosInstance";

export const memberSearch = async (nickname) => {
    try {
        const accessToken = sessionStorage.getItem('accessToken');

        if (!accessToken) {
            throw new Error("로그인 다시");
        }
        const response = await axiosInstance.get(`/api/users/search?nickname=${nickname}`, {
            headers: {
                access: accessToken ? accessToken : "",
            },
        });

        if (response.status === 200) {
            return { isDuplicate: false, message: response.data };
        }
        throw new Error("에러임");
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return { isDuplicate: true, message: '없음' };
        }
        return { isDuplicate: true, message: '서버와의 연결이 잘안됩니다.' };
    }
};
