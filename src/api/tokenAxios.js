import axios from 'axios';

const API_URL = 'https://sequence.agong.store/';

const tokenAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'access': localStorage.getItem("accessToken"),
  },
});

export default tokenAxios;