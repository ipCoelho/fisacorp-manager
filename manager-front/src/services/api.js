import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8000/task-manager-api' });

export default api;
