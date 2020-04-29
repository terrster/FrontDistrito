import {
	UPDATE_STATUS_RECOVER_PASSWORD,
	UPDATE_STATUS_RECOVER_PASSWORD_SUCCESS,
	UPDATE_STATUS_RECOVER_PASSWORD_ERROR
} from '../types/recoverPasswordTypes';


export function updateRecoverPassword(status, text){
    return (dispatch) => {
        dispatch( recoverPassword() );
        try {
            dispatch(recoverPasswordSuccess(status, text))
        } catch (e) {
            dispatch (recoverPasswordSuccessError('Ocurrio un error. Intente otra vez'))
        }
    }
}

const recoverPassword = () => ({
    type: UPDATE_STATUS_RECOVER_PASSWORD,
});

const recoverPasswordSuccess = (status, text) => ({
    type: UPDATE_STATUS_RECOVER_PASSWORD_SUCCESS,
    payload: { status, text }
});

const recoverPasswordSuccessError = error => ({
    type: UPDATE_STATUS_RECOVER_PASSWORD_ERROR,
    payload: error
});