import {
    UPDATE_STATUS_PASSWORD
} from '../types/resetPasswordTypes';

export function updateResetPassword(status, text){
    return dispatch => {
        dispatch( updateStatusPassword(status, text));
    }
}

const updateStatusPassword = (status, text) => ({
    type: UPDATE_STATUS_PASSWORD,
    payload: { status, text}
});