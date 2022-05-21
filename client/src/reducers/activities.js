import { FETCH_ACTIVITIES } from "../constants/actionTypes";

const activitiesReducers = (state={}, action) => {
    switch (action.type) {
        case FETCH_ACTIVITIES:
            return {...state, data: action.payload.status, status: action.payload.status};
        default:
            return state;
    }
}

export default activitiesReducers;