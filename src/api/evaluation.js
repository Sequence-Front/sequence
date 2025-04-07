import axiosInstance from "./axiosInstance";

export const getEvaluation = async (archiveId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axiosInstance.get(`/api/archive/${archiveId}/evaluations`, {
      headers: {
        access: accessToken ? accessToken : "",
      },
    });

    console.log("평가 요청 응답:", response.status);
    return response;
  } catch (error) {
    console.error("평가 API 요청 중 오류 발생:", error);
    throw error;
  }
};

export const postEvaluation = async (archiveId, evaluationsData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axiosInstance.post(`/api/archive/${archiveId}/evaluations`, evaluationsData, {
      headers: {
        access: accessToken ? accessToken : "",
      },
    });

    return response;
  } catch (error) {
    console.error("평가 API 요청 중 오류 발생:", error);
    throw error;
  }
};

export const postStatusEvaluation= async (archiveId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axiosInstance.get(`/api/archive/${archiveId}/evaluations/status`,  {
      headers: {
        access: accessToken ? accessToken : "",
      },
    });

    return response;
  } catch (error) {
    console.error("평가 API 요청 중 오류 발생:", error);
    throw error;
  }
};


export const getEvaluationStatus = async (archiveId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axiosInstance.get(`/api/archive/${archiveId}/evaluations/status`, {
      headers: {
        access: accessToken ? accessToken : "",
      },
    });

    console.log("평가 상태 요청:", response.status);
    return response;
  } catch (error) {
    console.error("평가 상태 API 요청 중 오류 발생:", error);
    throw error;
  }
};
