import axiosInstance from "../utils/axiosConfig"

const getArchives = async (page = 0) => {
  try {
    const response = await axiosInstance.get('/api/archive/projects', {
      params: { page: 0 },
      headers: {
        'access': localStorage.getItem("accessToken"),
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('프로젝트 조회 에러:', error);
    throw error;
  }
}

const searchArchives = async (keyword, page = 0) => {
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

const postArchive = async(archiveData, images, thumbnail) => {
  try{
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();
    
    formData.append("archiveData", new Blob([JSON.stringify(archiveData)], {type: "application/json"}));

    if (Array.isArray(images) && images.every(img => img instanceof File)) {
      images.forEach((file) => {
        formData.append("images", file);
      });
      console.log("프로젝트 이미지들");
    } else {
      console.log("프로젝트 이미지 형식이 잘못되었습니다.");
    }

    if(thumbnail instanceof File){
      formData.append("thumbnail", thumbnail);
      console.log("프로젝트이미지2는 파일형식")
    }else{
      console.log("프로젝트이미지2는 파일형식아님");
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
  }
    const response = await axiosInstance.post('/api/archive', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        access: accessToken ? accessToken : ""

    },
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
  }

  console.log(response.status);
  if (response.status === 200) {
      return response;
  }
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