import axiosInstance from "../utils/axiosConfig"

const getArchives = async (page = 1) => {
  try {
    const response = await axiosInstance.get('/api/archive/projects', {
      params: { page },
      headers: {
        'access': localStorage.getItem("access"),
      }
    });
    return response.data;
  } catch (error) {
    console.error('프로젝트 조회 에러:', error);
    throw error;
  }
}

const searchArchives = async (keyword, page = 1) => {
  try {
    const response = await axiosInstance.get('/api/archive/projects/search', {
      params: { keyword, page },
      headers: {
        'access': localStorage.getItem("access"),
      }
    });
    return response.data;
  } catch (error) {
    console.error('프로젝트 검색 에러:', error);
    throw error;
  }
}

export { getArchives, searchArchives };