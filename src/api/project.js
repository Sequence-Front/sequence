import tokenAxios from "./tokenAxios";

const getProjects = async () => {
  try {
    const response = await tokenAxios.get('/api/projects/list');
    return response.data;
  } catch (error) {
    console.error('프로젝트 조회 에러:', error);
    throw error;
  }
}

const searchProjects = async (title) => {
  try {
    const response = await tokenAxios.get(`/api/projects/filter/search?title=${title}`);
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
    
    const response = await tokenAxios.get(`/api/projects/filter/keyword?${queryString}`);
    return response.data;
  } catch (error) {
    console.error('프로젝트 필터링 에러:', error);
    throw error;
  }
}

export { getProjects, searchProjects, filterProjects };