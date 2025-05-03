import tokenAxios from "./tokenAxios"

export const getNotice = async () => {
    try{
        const response = await tokenAxios.get('/api/alarm/project-archive');
        console.log("알림창 / 서버로온 데이터", response.data);
        console.log("로그인한 아이디: ", localStorage.getItem('nickname'));
        return response.data;
    }  catch (error){
        console.error('에러');
        throw error;
    }
}

export const acceptNotice = async(projectInvitedMemberId) => {
    try{
        const response = await tokenAxios.post(`/api/alarm/invited-projects/${projectInvitedMemberId}`);
        console.log("수락버튼 완료", projectInvitedMemberId);
        alert("수락했습니다.");
        return response.data;
    }catch(error){
        console.error("수락버튼 오류");
        console.log("번호",projectInvitedMemberId);
        throw error
    }
}

export const deleteNotice = async(projectInvitedMemberId) => {
    try{
        const response = await tokenAxios.delete(`/api/alarm/invited-projects/${projectInvitedMemberId}`);
        console.log("거절버튼 완료", projectInvitedMemberId);
        alert("거절했습니다.");
        return response.data;
    }catch(error){
        console.error("거절버튼 오류");
        throw error
    }
}