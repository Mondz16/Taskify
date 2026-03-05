import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: false
});

API.interceptors.request.use((req:any) => {
    const user = JSON.parse(localStorage.getItem("user") || 'null');
    if(user?.token){
        req.headers.Authorization = `Bearer ${user.token}`;
    }

    return req;
})

export default API;