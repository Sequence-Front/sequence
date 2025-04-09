import tokenAxios from "./tokenAxios"

export const delWithdraw = async (password) => {
    try{
        const response = await tokenAxios.delete('/api/user/delete', {data: password});
        console.log("서버로온 데이터", response.data);
        
        return response.data;
    }  catch (error){
        console.error('에러');
        throw error;
    }
}