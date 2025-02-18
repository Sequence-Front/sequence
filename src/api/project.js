import axiosInstance from "../utils/axiosConfig"

const getProject = async (data) => {

  try {
    const response = await axiosInstance.get('/api/project/list', {
      headers: {
        'access': localStorage.getItem("access"),
      }
    }).then(res => {
      
    });
  } catch (error) {
    console.error('프로젝트 조회 에러:', error);
  }
}

export { getProject };