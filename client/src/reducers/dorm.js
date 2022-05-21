import { REGISTER, FETCH_APPLICANTS, FETCH_APPLICANT, CHANGE_STATUS, START_LOADING, END_LOADING, OPEN_REGISTRATION, FETCH_REGTIME, FETCH_DORMS, ADD_BUILDING, ADD_ROOM } from "../constants/actionTypes";

const dormReducers = (state={isLoading: true, regTime: null}, action, ) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING: 
            return {...state, isLoading: false};
        case REGISTER:
            return {...state, data: action.payload.data, status: action.payload.status};
        case FETCH_APPLICANTS:
            return {...state, data: action.payload.data, status: action.payload.status, regTime: action.payload.regTime, totalLeft: action.payload.totalLeft};
        case FETCH_APPLICANT:
            return {...state, data: action.payload.data, status: action.payload.status};
        case FETCH_REGTIME:
            return {...state, regTime: action.payload.regTime, totalLeft: action.payload.totalLeft};
        case CHANGE_STATUS:
            return {...state, status: action.payload.status};
        case OPEN_REGISTRATION:
            return {...state, regTime: action.payload.regTime};

        case FETCH_DORMS:
            return {...state, dorms: action.payload.data};
        case ADD_BUILDING:
            return {...state, dorms: action.payload.data};
        case ADD_ROOM:
            return {...state, dorms: action.payload.data};

        default:
            return state;
    }
}

export default dormReducers;