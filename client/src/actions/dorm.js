import { FETCH_APPLICANTS, FETCH_APPLICANT, REGISTER, CHANGE_STATUS, START_LOADING, END_LOADING, OPEN_REGISTRATION, FETCH_REGTIME, FETCH_DORMS, ADD_BUILDING, ADD_ROOM } from '../constants/actionTypes';
import * as api from '../api';

export const registerToDorm = (formData) => async (dispatch) => {
    try {
        const data = await api.registerToDorm(formData);
        dispatch({type: REGISTER, payload: data});
    } catch (error) {
        console.log(error);
    }
}


export const getApplicants = (status) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data: res} = await api.getApplicants(status);
        
        dispatch({type: FETCH_APPLICANTS, payload: {data: res.data, regTime: res.regTime, totalLeft: res.totalLeft}});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const getApplicant = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.getApplicant(id);
        
        dispatch({type: FETCH_APPLICANT, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const changeStatus = (id, newData) => async (dispatch) => {
    try {
        const data = await api.changeStatus(id, newData);

        dispatch({type: CHANGE_STATUS, payload: data});
    } catch (error) {
        console.log(error);       
    }
}

export const openRegistration = (data) => async (dispatch) => {
    try {
        const {regTime} = await api.openRegistration(data);

        dispatch({type: OPEN_REGISTRATION, payload: {regTime}});
    } catch (error) {
        console.log(error);       
        
    }
}
export const changeRegistration = (data) => async (dispatch) => {
    try {
        const {regTime} = await api.changeRegistration(data);

        dispatch({type: OPEN_REGISTRATION, payload: {regTime}});
    } catch (error) {
        console.log(error);       
        
    }
}

export const getRegTime = () => async (dispatch) => {
    try {
        const res = await api.fetchRegistrationTime();

        dispatch({type: FETCH_REGTIME, payload: {regTime: res.data.regTime, totalLeft: res.data.totalLeft}});
    } catch (error) {
        console.log(error);       
        
    }
}

export const getDorms = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.getBuildings();
        
        dispatch({type: FETCH_DORMS, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const addBuilding = (formData) => async (dispatch) => {
    try {
        const data = await api.addBuilding(formData);
        dispatch({type: ADD_BUILDING, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const addRoom = (formData) => async (dispatch) => {
    try {
        const data = await api.addRoom(formData);
        dispatch({type: ADD_ROOM, payload: data}); 
    } catch (error) {
        console.log(error);
    }
}