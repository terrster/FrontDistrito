import { combineReducers } from 'redux';
import userReducer  from '../reducers/userReducer';
import simulatorReducer from '../reducers/simulatorReducer';
import modalReducer from './modalReducer';
import recoverPasswordReducer from './recoverPasswordReducer';
import loaderReducer from './loaderReducer'

export default combineReducers({
    user: userReducer,
    simulator: simulatorReducer,
    modal: modalReducer,
    recoverPassword: recoverPasswordReducer,
    loader: loaderReducer
});