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
