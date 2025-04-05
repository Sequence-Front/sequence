import tokenAxios from "./tokenAxios";

const CommentPost = async (id: string | undefined, comment: string, parentCommentId?: number | null) => {
  try {
    const nickname = localStorage.getItem('nickname');
    
    const requestBody = {
      content: comment,
      writer: nickname,
      parentId: parentCommentId
    };

    const response = await tokenAxios.post(
      `/api/archive/${id}/comments`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error('댓글 등록 에러:', error);
    throw error;
  }
}

const CommentPut = async (id: string | undefined, content: string, commentId: number) => {
  try {
    const nickname = localStorage.getItem('nickname');

    const requestBody = {
        writer: nickname,
        content: content,
      };
    const response = await tokenAxios.put(
      `/api/archive/${id}/comments/${commentId}`,
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
    const response = await tokenAxios.delete(
      `/api/archive/${id}/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 에러:', error);
    throw error;
  }
}

export { CommentPost, CommentPut, CommentDelete };