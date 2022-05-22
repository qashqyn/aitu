import { START_LOADING, END_LOADING, CREATE_ACTIVITY, FETCH_ACTIVITIES, FETCH_ACTIVITY, DELETE_ACTIVITY } from "../constants/actionTypes";

const activitiesReducers = (state={isLoading: true}, action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING: 
            return {...state, isLoading: false};
        case FETCH_ACTIVITIES:
            return {...state, data: action.payload.data, status: action.payload.status};
        case FETCH_ACTIVITY:
            return {...state, data: action.payload.data, status: action.payload.status};
        case CREATE_ACTIVITY:
            return {...state, data: action.payload.data, status: action.payload.status};
        case DELETE_ACTIVITY:
            return {...state, data: action.payload.data, status: action.payload.status};
        default:
            return state;
    }
}

export default activitiesReducers;