import { UPDATE_SHOW_MODAL, UPDATE_REF_DOCUMENTS } from '../types/modalCiecTypes';

export const updateModalCiec = (status) => {
	return dispatch => {
		dispatch({
			type: UPDATE_SHOW_MODAL,
			payload: status
		});
	};
}

export const updateRefDocuments = (status) => {
	return dispatch => {
		dispatch({
			type: UPDATE_REF_DOCUMENTS,
			payload: status
		})
	}
}