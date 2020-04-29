import { combineReducers } from 'redux';
import userReducer  from '../reducers/userReducer';
import simulatorReducer from '../reducers/simulatorReducer';

export default combineReducers({
    user: userReducer,
    simulator: simulatorReducer
});