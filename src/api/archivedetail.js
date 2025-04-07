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


const deleteArchive = async (archiveId) => {
    try {
        await tokenAxios.delete(`/api/archive/${archiveId}`);
        alert("프로젝트가 삭제 되었습니다");
    } catch (error) {
        console.error('프로젝트 삭제 실패:', error);
        throw error;
    }
}

const addBookmark = async (archiveId) => {
    try {
        await tokenAxios.post(`/api/archive/${archiveId}/bookmark`);
        alert("북마크가 처리 되었습니다");
    } catch (error) {
        console.error('북마크 처리 실패:', error);
        throw error;
    }
}

export { getArchiveDetail, deleteArchive, addBookmark };