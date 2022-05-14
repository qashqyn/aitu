import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducers = (state={}, action) => {
    switch (action.type) {
        case AUTH:
            if(!!action.payload && !!action.payload.data && action.payload.status === 200){
                localStorage.setItem('profile', JSON.stringify({...action.payload.data}));        
                return { ...state, authData: action.payload?.data, status: action.payload.status};
            }
            return {...state, authData: null, status: action.payload?.status};
        case LOGOUT:
            localStorage.clear();

            return { ...state, authData: null};
        default:
            return state;
    }
}

export default authReducers;