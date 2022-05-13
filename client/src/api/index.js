import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const registerToDorm = (data) => API.post('/dorm/register', data);
export const getApplicants = (status) => API.get(`/dorm/applicants?status=${status}`);
export const getApplicant = (id) => API.get(`/dorm/applicants/${id}`);
export const changeStatus = (id, newData) => API.patch(`/dorm/applicants/${id}`, newData);
