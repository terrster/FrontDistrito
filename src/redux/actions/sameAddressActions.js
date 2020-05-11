import { SET_CURRENT_SAME_ADDRESS } from '../types/sameAddressTypes';

export const setSameAddress = (address) => {
    return dispatch => {
        dispatch({ 
            type: SET_CURRENT_SAME_ADDRESS, 
            payload: { address } 
        });
    }    
}