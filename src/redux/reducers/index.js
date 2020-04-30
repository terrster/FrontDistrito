import { combineReducers } from 'redux';
import userReducer  from '../reducers/userReducer';
import simulatorReducer from '../reducers/simulatorReducer';
import modalReducer from './modalReducer';
import { reducer as formReducer} from 'redux-form'
import recoverPasswordReducer from './recoverPasswordReducer';
import loaderReducer from './loaderReducer';
import resetPasswordReducer from './resetPasswordReducer'

export default combineReducers({
    user: userReducer,
    simulator: simulatorReducer,
    modal: modalReducer,
    recoverPassword: recoverPasswordReducer,
    loader: loaderReducer,
    form: formReducer, 
    resetPasswordStatus: resetPasswordReducer,
});