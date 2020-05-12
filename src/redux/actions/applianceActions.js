import {
    UPDATE_APPLIANCE,
    UPDATE_GENERAL
} from '../types/applianceTypes';

export const updateAppliance = appliance => {
    return dispatch => {
        dispatch({ type: UPDATE_APPLIANCE, payload: appliance });
    }
}

export const updateApplianceGeneralInfo = generalInfo => {
    return dispatch => {
        dispatch({ 
            type: UPDATE_GENERAL, 
            payload: { generalInfo } 
        });
    }
}