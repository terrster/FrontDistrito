import {
    START_REGISTRATION,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,
    START_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../types/authTypes';
import Axios from '../../utils/axios';

export function singUpAction(data){
    return async(dispatch) => {
        dispatch( startRegistration() );

        try{
			dispatch( registrationSuccess() );
			
            const credentials = {
				email: data.email,
				password: data.password
			}
		
			const loginRequest = await Axios.post('login', credentials);
			
			if (loginRequest.data.code === 200){
				dispatch( loginAction(loginRequest.data) );
			}
			
			setTimeout( () => {
				window.location.href = `${process.env.REACT_APP_REDIRECT}/registroexitoso`;
			}, 100)

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

export function loginAction(data){
    return async(dispatch) => {
        dispatch( startLogin() );

        try{
			sessionStorage.setItem('user', JSON.stringify(data.user));
			sessionStorage.setItem("token", data.token);
			sessionStorage.setItem("broker", data.Brokertelefono);
			dispatch( loginSuccess() );

        }
        catch(error){
			console.log(error);
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
