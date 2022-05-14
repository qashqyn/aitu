import { combineReducers } from "redux";

import dorm from './dorm';
import auth from './auth';

export default combineReducers({
    dorm, auth
});