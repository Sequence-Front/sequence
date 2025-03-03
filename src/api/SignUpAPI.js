import axiosInstance from './axiosInstance'

export const IdDupCheck = async (username) => {
    try {
        const response = await axiosInstance.get(`/api/users/check_username?username=${username}`);

        if (response.status === 200) {
            return { isDuplicate: false, message: '사용 가능한 아이디입니다.' };
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return { isDuplicate: true, message: '이미 사용 중인 아이디입니다.' };
        }
        console.error('아이디 중복 확인 중 오류 발생:', error);
        return { isDuplicate: true, message: '아이디 확인 중 오류가 발생했습니다.' };
    }
};

export const eMailDupCheck = async (email) => {
    try {
        const response = await axiosInstance.get(`/api/users/check_email?email=${email}`);

        if (response.status === 200) {
            return { isDuplicate: false, message: '사용 가능한 이메일입니다.' };
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return { isDuplicate: true, message: '이미 사용 중인 이메일입니다.' };
        }
        return { isDuplicate: true, message: '이메일 확인 중 오류가 발생했습니다.' };
    }
};

export const nickNameDupCheck = async (nickname) => {
    try {
        const response = await axiosInstance.get(`/api/users/check_nickname?nickname=${nickname}`);

        if (response.status === 200) {
            console.log("사용가능한 닉네임.");
            return { isDuplicate: false, message: '사용 가능한 닉네임입니다.' };
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log("이미 사용 중인 닉네임입니다.");
            return { isDuplicate: true, message: '이미 사용 중인 닉네임입니다.' };
        }
        console.log("오류");
        return { isDuplicate: true, message: '닉네임 확인 중 오류가 발생했습니다.' };
    }
};

export const signUpApi = async (userData, authImgFile) => {
    try {
        const formData = new FormData();

        formData.append("memberDTO", new Blob([JSON.stringify(userData)], { type: "application/json" }));

        if(authImgFile instanceof File){
            formData.append("authImgFile", authImgFile);
            console.log("파일형식임");
        } else{
            console.log("파일형식 아님");
        }
        
        console.log(authImgFile);
        const response = await axiosInstance.post('/api/users/join', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        console.log(response.status);
        if (response.status === 200) {
            console.log("유저 데이터: ", userData);
            console.log("유저 데이터: ", authImgFile);
            return response;
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log("값 입력이 잘못되었습니다.");
            console.log("유저 데이터: ", userData);
        } else {
            console.log("서버와의 연결이 원활하지 않습니다.");
            console.log("유저 데이터: ", userData);
        }
        throw error;
    }
};