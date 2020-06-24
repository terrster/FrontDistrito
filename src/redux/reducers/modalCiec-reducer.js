import { UPDATE_SHOW_MODAL, UPDATE_REF_DOCUMENTS } from '../types/modalCiecTypes';

const initialState = {
	showModal: true,
	refDocuments: false
}

const alertReducer = ( state = initialState, action) => {
	switch(action.type){
		case UPDATE_SHOW_MODAL:
            return {
				...state,
				showModal: action.payload
			}
		case UPDATE_REF_DOCUMENTS:
			return {
				...state,
				refDocuments: action.payload
			}
		default :
			return state
	}

}

export default alertReducer;