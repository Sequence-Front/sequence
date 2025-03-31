import axiosInstance from "../utils/axiosConfig"

const getProjectDetail = async (projectId) => {
    try {
        const response = await axiosInstance.get(`/api/projects/${projectId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('프로젝트 상세 정보 조회 실패:', error);
        throw error;
    }
}

export { getProjectDetail };