import { START_LOADING, END_LOADING, CREATE_ACTIVITY, DELETE_ACTIVITY, FETCH_ACTIVITIES, FETCH_ACTIVITY } from '../constants/actionTypes';
import * as api from '../api';

export const getActivities = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.getActivities();
        
        dispatch({type: FETCH_ACTIVITIES, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const getActivity = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.getActivity(id);
        
        dispatch({type: FETCH_ACTIVITY, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const createActivity = (formData) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.createActivity(formData);
        
        dispatch({type: CREATE_ACTIVITY, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const deleteActivity = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.deleteActivity(id);
        
        dispatch({type: DELETE_ACTIVITY, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}