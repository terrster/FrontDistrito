import {  
    UPDATE_MODAL,
    UPDATE_MODAL_SUCCESS,
    UPDATE_MODAL_ERROR
} from '../types/modalTypes';

export function updateModal(name){
    return (dispatch) => {
        dispatch( modal() );
        try {
            dispatch ( modalSuccess(name) )
        } catch (e) {
            dispatch ( modalError("Error al mostrar el mensaje. Intentelo otra vez."))
        }
    }
}

const modal = () => ({
    type: UPDATE_MODAL
});

const modalSuccess = (name) => ({
    type: UPDATE_MODAL_SUCCESS,
    payload: name
});

const modalError = (error) => ({
    type: UPDATE_MODAL_ERROR,
    payload: error
});