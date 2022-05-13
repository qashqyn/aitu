import { REGISTER, FETCH_APPLICANTS, FETCH_APPLICANT, CHANGE_STATUS } from "../constants/actionTypes";

const dormReducers = (state={}, action) => {
    switch (action.type) {
        case REGISTER:
            return {...state, data: action.payload.data, status: action.payload.status};
        case FETCH_APPLICANTS:
            return {...state, data: action.payload.data, status: action.payload.status};
        case FETCH_APPLICANT:
            return {...state, data: action.payload.data, status: action.payload.status};
        case CHANGE_STATUS:
            return {...state, data: action.payload.data, status: action.payload.status};
        default:
            return state;
    }
}

export default dormReducers;