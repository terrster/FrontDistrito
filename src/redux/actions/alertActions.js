import { UPDATE_ALERT_MSG } from '../types/alertTypes';

export const updateAlert = (status, names) => {
    return dispatch => {
        dispatch({ 
            type: UPDATE_ALERT_MSG, 
            payload: { status, names } 
        });
    }
}