import {
    START_REGISTRATION,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,
    START_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../types/authTypes';

const initialState = {
    logged: false,
    loading: false,
    error: null
};

export default function(state = initialState, action){
    switch(action.type){
        case START_REGISTRATION:
        case START_LOGIN:
            return {
                ...state,
                loading: true
            }
        case REGISTRATION_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                logged: true,
                loading: false
            }
        case REGISTRATION_FAILED:
        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}