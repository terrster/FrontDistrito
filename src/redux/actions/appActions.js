import {
    UPDATE_TOAST,
    UPDATE_DATE,
    UPDATE_NAVBAR,
    UPDATE_DROPDOWN,
    UPDATE_TOAST_REGISTER
} from '../types/appTypes';

export const updateToast = (state, key) => {
    state[key] = !state[key];
    return dispatch => {
        dispatch({ 
            type: UPDATE_TOAST, 
            payload: state
        });
    }
}

export const updateDate = (date) => {
    return dispatch => {
        dispatch({ 
            type: UPDATE_DATE, 
            payload: date
        });
    }
}
