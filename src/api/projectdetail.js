import tokenAxios from "./tokenAxios";

const getProjectDetail = async (projectId) => {
    try {
        const response = await tokenAxios.get(`/api/projects/${projectId}`);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('프로젝트 상세 정보 조회 실패:', error);
        throw error;
    }
}

const deleteProject = async (projectId) => {
    try {
        await tokenAxios.delete(`/api/projects/${projectId}`);
        alert("프로젝트가 삭제 되었습니다");
    } catch (error) {
        console.error('프로젝트 삭제 실패:', error);
        throw error;
    }
}

const addBookmark = async (projectId) => {
    try {
        await tokenAxios.post(`/api/projects/${projectId}/bookmark`);
        alert("북마크가 등록 되었습니다");
    } catch (error) {
        console.error('북마크 등록 실패:', error);
        throw error;
    }
}

const removeBookmark = async (projectId) => {
    try {
        await tokenAxios.delete(`/api/projects/${projectId}/bookmark`);
        alert("북마크가 삭제 되었습니다");
    } catch (error) {
        console.error('북마크 삭제 실패:', error);
        throw error;
    }
}



export { getProjectDetail, deleteProject, addBookmark, removeBookmark };