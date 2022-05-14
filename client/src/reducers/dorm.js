import { REGISTER, FETCH_APPLICANTS, FETCH_APPLICANT, CHANGE_STATUS, START_LOADING, END_LOADING } from "../constants/actionTypes";

const dormReducers = (state={isLoading: true}, action, ) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING: 
            return {...state, isLoading: false};
        case REGISTER:
            console.log(action.payload.status);
            return {...state, data: action.payload.data, status: action.payload.status};
        case FETCH_APPLICANTS:
            return {...state, data: action.payload.data, status: action.payload.status};
        case FETCH_APPLICANT:
            return {...state, data: action.payload.data, status: action.payload.status};
        case CHANGE_STATUS:
            return {...state, status: action.payload.status};
        default:
            return state;
    }
}

export default dormReducers;