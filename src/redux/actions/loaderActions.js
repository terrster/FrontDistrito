import {
    UPDATE_LOADER,
    UPDATE_LOADER_ALT
} from '../types/loaderTypes';

export function updateLoader(loading, msg) {
    if(msg){
        return dispatch => {
            dispatch(activeLoader({loading, msg}));
        }
    } else {
        return dispatch => {
            dispatch(activeLoader({loading}));
        }
    }
}

const activeLoader = loader => ({
    type: UPDATE_LOADER,
    payload: loader
})
// const activeLoaderms = loader => ({
//     type: UPDATE_LOADER_ALT,
//     payload: loader
// })