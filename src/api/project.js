import tokenAxios from "./tokenAxios";

const getProjects = async (filters = {}, page = 0, size = 12) => {
  try {
    const queryParams = new URLSearchParams();
    
    // 필터 파라미터 추가
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    
    // 페이지네이션 파라미터 추가
    queryParams.append('page', page);
    queryParams.append('size', size);
    
    const response = await tokenAxios.get(`/api/projects/filter/keyword?${queryParams.toString()}`);
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
    
    // 응답에 totalPages가 없으면 기본값 0 설정
    if (response.data && response.data.totalPages === undefined) {
      response.data.totalPages = 0;
    }
    
    return response.data;
  } catch (error) {
    console.error('프로젝트 필터링 에러:', error);
    throw error;
  }
}

const postProject = async(project) => {
  try{
    const accessToken = sessionStorage.getItem('accessToken');
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
    const accessToken = sessionStorage.getItem('accessToken');
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