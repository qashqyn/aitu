import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const login = (formData) => async (dispatch) => {
    try {
        const data = await api.login(formData);
        
        dispatch({type: AUTH, payload: data});
    } catch (error) {
        console.log(error);
    }
}
