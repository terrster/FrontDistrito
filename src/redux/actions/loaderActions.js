import {
    UPDATE_LOADER
} from '../types/loaderTypes';

export function updateLoader(loading){
    return dispatch => {
        dispatch( activeLoader(loading))
    }
}

const activeLoader = loader => ({
    type: UPDATE_LOADER,
    payload: loader
})