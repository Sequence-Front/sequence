import axiosInstance from "../utils/axiosConfig"

const getProjects = async () => {
  try {
    const response = await axiosInstance.get('/api/projects/list', {
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

const searchProjects = async (title) => {
  try {
    const response = await axiosInstance.get(`/api/projects/filter/search?title=${title}`, {
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

const filterProjects = async (filters) => {
  try {
    const queryString = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    
    const response = await axiosInstance.get(`/api/projects/filter/keyword?${queryString}`, {
      headers: {
        'access': localStorage.getItem("access"),
      }
    });
    return response.data;
  } catch (error) {
    console.error('프로젝트 필터링 에러:', error);
    throw error;
  }
}

export { getProjects, searchProjects, filterProjects };