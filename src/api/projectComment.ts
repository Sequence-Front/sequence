import tokenAxios from "./tokenAxios";

const CommentPost = async (id: string | undefined, comment: string, parentCommentId?: number | null) => {
  try {
    const requestBody = {
      content: comment,
      ...(parentCommentId && { parentCommentId })
    };

    const response = await tokenAxios.post(
      `/api/projects/${id}/comments`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error('댓글 등록 에러:', error);
    throw error;
  }
}

const CommentPut = async (id: string | undefined, comment: string, commentId: number) => {
  try {
    const requestBody = {
      content: comment,
    };

    const response = await tokenAxios.post(
      `/api/projects/${id}/comments/${commentId}`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error('댓글 수정 에러:', error);
    throw error;
  }
}

const CommentDelete = async (id: string | undefined, commentId: number) => {
  try {
    await tokenAxios.delete(`/api/projects/${id}/comments/${commentId}`);
  } catch (error) {
    console.error('댓글 수정 에러:', error);
    throw error;
  }
}

export { CommentPost, CommentPut, CommentDelete };