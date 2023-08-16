import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://adm-rockit-back:3000/api/',
    baseURL: 'http://localhost:8000/api/',
    // baseURL: '_API_URL_/api/',
});

export default api;
