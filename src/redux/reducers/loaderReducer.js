import {
    UPDATE_LOADER,
    UPDATE_LOADER_ALT
} from '../types/loaderTypes'

const initialState = {
    isLoading: false,
    msg: 'Estamos procesando tus documentos y en breve te daremos una respuesta'
}

const loaderReducer = (state = initialState, action) => {
    switch (action.type){
        case UPDATE_LOADER:
            return {
                ...state,
                isLoading: action.payload
            }
        case UPDATE_LOADER_ALT:
            return {
                ...state,
                isLoading: action.payload.loading,
                msg: action.payload.msg
            }
        default: 
            return state
    }
}
export default loaderReducer