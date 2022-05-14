import { FETCH_APPLICANTS, FETCH_APPLICANT, REGISTER, CHANGE_STATUS, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api';

export const registerToDorm = (formData) => async (dispatch) => {
    try {
        console.log(formData)
        const data = await api.registerToDorm(formData);
        dispatch({type: REGISTER, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = (status) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.getApplicants(status);
        
        dispatch({type: FETCH_APPLICANTS, payload: data});
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