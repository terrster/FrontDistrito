import {
    UPDATE_DOCUMENTS_STATUS_COMPLETED,
    UPDATE_NAME_DOCUMENTS_COMPLETED,
    UPDATE_TYPE_DOCUMENT
} from '../types/docsStatusTypes';

export const updateDocumentsStatus = status => {
    return dispatch => {
        dispatch({ 
            type: UPDATE_DOCUMENTS_STATUS_COMPLETED, 
            payload: status
        });
    }
}

export const updateDocumentsNames = names => {
    return dispatch => {
        dispatch({ 
            type: UPDATE_NAME_DOCUMENTS_COMPLETED, 
            payload:  names 
        });
    }
}

export const updateDocumentsType = (isUpdate, id) => {
    return dispatch => {
        dispatch({ 
            type: UPDATE_TYPE_DOCUMENT, 
            payload: { isUpdate, id } 
        });
    }
}