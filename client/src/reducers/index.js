import { combineReducers } from "redux";

import dorm from './dorm';
import auth from './auth';
import activity from './activity';

export default combineReducers({
    dorm, auth, activity
});