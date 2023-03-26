import { LOGIN_ADMIN } from '../types/adminTypes';

export const loginAdmin = (user) => {
    return dispatch => {
        dispatch({ type: LOGIN_ADMIN, payload: { user } });
    }
}