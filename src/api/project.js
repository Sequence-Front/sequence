import tokenAxios from "./tokenAxios";

const getProjects = async () => {
  try {
    const response = await tokenAxios.get('/api/projects/list');
    // console.log(response)
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

const postProject = async(project) => {
  try{
    const accessToken = localStorage.getItem('accessToken');
    const response = await tokenAxios.post('/api/projects', project, {
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

const editProject = async(project, projectId) => {
  try{
    const accessToken = localStorage.getItem('accessToken');
    const response = await tokenAxios.put(`/api/projects/${projectId}`, project, {
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

export { getProjects, searchProjects, filterProjects, postProject, editProject };