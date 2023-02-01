import { LOGIN_ADMIN } from '../types/adminTypes';

const initialState = {
    user: null
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ADMIN:
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return state
    }
}

export default adminReducer