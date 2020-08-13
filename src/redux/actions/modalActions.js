import {  
    UPDATE_MODAL,
    UPDATE_MODAL_SUCCESS,
    UPDATE_MODAL_ERROR
} from '../types/modalTypes';

export function updateModal(name, message){
    return (dispatch) => {
        dispatch( modal() );

        try {
            dispatch ( modalSuccess({name, message}) )
        } catch (e) {
            dispatch ( modalError("Error al mostrar el mensaje. Intentelo otra vez."))
        }
    }
}

const modal = () => ({
    type: UPDATE_MODAL
});

const modalSuccess = (data) => ({
    type: UPDATE_MODAL_SUCCESS,
    payload: data
});

const modalError = (error) => ({
    type: UPDATE_MODAL_ERROR,
    payload: error
});