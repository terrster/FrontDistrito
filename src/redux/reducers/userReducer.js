import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../types/userTypes';

const initialState = {
    _token : null
};

export default function(state = initialState, action){
    switch(action.type){
        default:
            return state;
    }
}