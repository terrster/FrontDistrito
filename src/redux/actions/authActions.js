import {
    START_REGISTRATION,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,
    START_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../types/authTypes';

export function singUpAction(request){
    return (dispatch) => {
        dispatch( startRegistration() );
        console.log(request);

        try{
            dispatch( registrationSuccess() );
        }
        catch(error){
            dispatch( registrationFailed('Some error') );
        }
    }
}

const startRegistration = () => ({
    type: START_REGISTRATION
});

const registrationSuccess = () => ({
    type: REGISTRATION_SUCCESS
});

const registrationFailed = error => ({
    type: REGISTRATION_FAILED,
    payload: error
});

export function singInAction(credentials){
    return (dispatch) => {
        dispatch( startLogin() );

        try{
            dispatch( loginSuccess() );
        }
        catch(error){
            dispatch( loginFailed('Some error') );
        }
    }
}

const startLogin = () => ({
    type: START_LOGIN
});

const loginSuccess = () => ({
    type: LOGIN_SUCCESS
});

const loginFailed = error => ({
    type: LOGIN_FAILED,
    payload: error
});