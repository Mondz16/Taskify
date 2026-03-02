import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: false
});

export default API;