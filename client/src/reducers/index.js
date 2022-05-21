import { combineReducers } from "redux";

import dorm from './dorm';
import auth from './auth';
import activities from './activities';

export default combineReducers({
    dorm, auth, activities
});