import { FETCH_APPLICANTS, FETCH_APPLICANT, REGISTER, CHANGE_STATUS } from '../constants/actionTypes';
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
        const data = await api.getApplicants(status);
        
        dispatch({type: FETCH_APPLICANTS, payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const getApplicant = (id) => async (dispatch) => {
    try {
        const data = await api.getApplicant(id);
        
        dispatch({type: FETCH_APPLICANT, payload: data});
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