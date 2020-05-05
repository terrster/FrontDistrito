import {
    START_REGISTRATION,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,
    START_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../types/authTypes';
import Axios from '../../utils/axios';

export function singUpAction(request){
    return async(dispatch) => {
        dispatch( startRegistration() );

        try{
            const {data} = await Axios.post('signin', request);
            if(data.code == 200){
                sessionStorage.setItem("nameUser", data.user.name);
                dispatch( registrationSuccess() );

                const credentials = {
                    email: request.email,
                    password: request.password
                }

                dispatch( singInAction(credentials) );
            }
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
    return async(dispatch) => {
        dispatch( startLogin() );

        try{
            const {data} = await Axios.post('login', credentials);
            sessionStorage.setItem("token", data.token);
            dispatch( loginSuccess() );

            window.location.href = `${process.env.REACT_APP_REDIRECT}/registroexitoso`;
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