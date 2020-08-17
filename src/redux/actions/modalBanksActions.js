import { UPDATE_SHOW_MODAL_BANKS } from '../types/modalBanksTypes';

export const updateModalBanks = (status) => {
	return dispatch => {
		dispatch({
			type: UPDATE_SHOW_MODAL_BANKS,
			payload: status
		});
	};
}