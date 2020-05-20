import {
    UPDATE_FILES_ARR,
    UPDATE_FILES
} from '../types/documentsTypes';

export const updateAllDocs = (files, key) => {
    return dispatch => {
        dispatch({ 
            type: UPDATE_FILES_ARR, 
            data: { key, files } 
        });
    }
}

export const updateDocuments = (file, key) => {
    return dispatch => {
        dispatch({ 
            type: UPDATE_FILES, 
            data: { key, file } 
        });
    }
}