import axiosInstance from "../utils/axiosConfig"

const CommentPost = async (id, comment) => {
  try {
    const response = await axiosInstance.post(
      `/api/projects/${id}/comments`,
      { content: comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          'access': localStorage.getItem("accessToken")
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('댓글 등록 에러:', error);
    throw error;
  }
}

export { CommentPost };