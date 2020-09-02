import { UPDATE_SHOW_MODAL_BANKS } from '../types/modalBanksTypes';

const initialState = {
	showModal: false
}

export default function( state = initialState, action){
	switch(action.type){
		case UPDATE_SHOW_MODAL_BANKS:
            return {
				...state,
				showModal: action.payload
			}
		default :
			return state
	}

}