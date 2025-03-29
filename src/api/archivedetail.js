import tokenAxios from "./tokenAxios.js"

const getArchiveDetail = async (archiveId) => {
    try {
        const response = await tokenAxios.get(`/api/archive/${archiveId}`);
        return response.data;
    } catch (error) {
        console.error('프로젝트 상세 정보 조회 실패:', error);
        throw error;
    }
}

export { getArchiveDetail };