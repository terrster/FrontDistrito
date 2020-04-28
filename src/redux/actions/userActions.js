import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../types/userTypes';

export function loginAction(credentials){
    return (dispatch) => {
        dispatch( login() );
    }
}

const login = () => ({
    type: LOGIN
});

const loginSuccess = () => ({
    type: LOGIN_SUCCESS
});

const loginFailed = () => ({
    type: LOGIN_FAILED
});