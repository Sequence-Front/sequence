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

const postProject = async(project) => {
  try{
    const accessToken = localStorage.getItem('accessToken');
    const response = await axiosInstance.post('/api/projects', project, {
      headers: {
        access: accessToken ? accessToken : "",
    },
    });

    console.log(response.status);
    console.log("프로젝트 데이터: ",project);
    if(response.status === 200){
      return response;
    }
    throw response.status.error;
  } catch(error){
    if(error.response && error.response.status === 100){
      console.log("카테고리 입력");
    }
    else if(error.response && error.response.status === 40000){
      console.log("값을 잘못입력");
    }
    throw error;
  }
}

export { getProjects, searchProjects, filterProjects, postProject };