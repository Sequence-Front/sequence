import axiosInstance from "../utils/axiosConfig"

const getArchives = async (page = 1) => {
  try {
    const response = await axiosInstance.get('/api/archive/projects', {
      params: { page },
      headers: {
        'access': localStorage.getItem("accessToken"),
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
        'access': localStorage.getItem("accessToken"),
      }
    });
    return response.data;
  } catch (error) {
    console.error('프로젝트 검색 에러:', error);
    throw error;
  }
}

const postArchive = async(archive) => {
  try{
    const accessToken = localStorage.getItem('accessToken');
    const response = await axiosInstance.post('/api/archive', archive, {
      headers: {
        access: accessToken ? accessToken : "",
    },
    });

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

export { getArchives, searchArchives, postArchive};