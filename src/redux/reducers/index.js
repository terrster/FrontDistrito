import { combineReducers } from 'redux';
import userReducer  from '../reducers/userReducer';
import simulatorReducer from '../reducers/simulatorReducer';
import { reducer as formReducer} from 'redux-form';

export default combineReducers({
    user: userReducer,
    simulator: simulatorReducer,
    form: formReducer
});