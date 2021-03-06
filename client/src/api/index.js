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
export const openRegistration = (data) => API.post(`/dorm/open`, data);
export const changeRegistration = (data) => API.post(`/dorm/change_reg_time`, data);
export const fetchRegistrationTime = () => API.get(`/dorm/reg_time`);

export const getBuildings = () => API.get('/dorm/buildings');
export const addBuilding = (data) => API.post('/dorm/buildings/addbuilding', data);
export const addRoom = (data) => API.post('/dorm/buildings/addroom', data);

export const createActivity = (data) => API.post('/activities/', data);
export const deleteActivity = (id) => API.delete(`/activities/${id}`);
export const getActivities = () => API.get('/activities/');
export const getActivity = (id) => API.get(`/activities/${id}`);

export const login = (formData) => API.post('user/login', formData, {validateStatus: function (status) { return true }});
