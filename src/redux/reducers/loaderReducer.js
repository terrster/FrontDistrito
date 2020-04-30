import {
    UPDATE_LOADER
} from '../types/loaderTypes'

const initialState = {
    isLoading: false
}

const loaderReducer = (state = initialState, action) => {
    switch (action.type){
        case UPDATE_LOADER:
            return {
                ...state,
                isLoading: action.payload
            }
        default: 
            return state
    }
}
export default loaderReducer