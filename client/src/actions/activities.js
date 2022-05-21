import { FETCH_ACTIVITIES } from '../constants/actionTypes';
import * as api from '../api';

export const getActivities = (status) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.getActivities();
        
        dispatch({type: FETCH_ACTIVITIES, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}