import { combineReducers } from 'redux';
import authReducer  from '../reducers/authReducer';
//import userReducer  from '../reducers/userReducer';
import simulatorReducer from '../reducers/simulatorReducer';
import modalReducer from './modalReducer';
import { reducer as formReducer} from 'redux-form'
import recoverPasswordReducer from './recoverPasswordReducer';
import loaderReducer from './loaderReducer';
import resetPasswordReducer from './resetPasswordReducer';
import appReducer from './app-reducer';
import applianceReducer from './appliance-reducer';
import sameAddressReducer from './same-address';
import formsTypeReducer from './forms-type-reducer';
import documentsReducer from './documents-reducer';
import alertReducer from './alert-reducer';
import docsStatusReducer from './docs-status-reducer';

export default combineReducers({
    alert: alertReducer,
    app : appReducer,
    appliance : applianceReducer,
    auth: authReducer,
    actionForm: formsTypeReducer,
    currentAddress: sameAddressReducer,
    documents: documentsReducer,
    docsStatus: docsStatusReducer,
    //user: userReducer,
    simulator: simulatorReducer,
    modal: modalReducer,
    recoverPassword: recoverPasswordReducer,
    loader: loaderReducer,
    form: formReducer, 
    resetPasswordStatus: resetPasswordReducer,
});