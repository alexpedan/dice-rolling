import { combineReducers } from 'redux'

import userReducer from '../user/UserReducer';
import appReducer from './AppReducers';

export default combineReducers({
    user: userReducer,
    app: appReducer
});
