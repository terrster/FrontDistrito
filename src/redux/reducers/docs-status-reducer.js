import {
	UPDATE_DOCUMENTS_STATUS_COMPLETED,
	UPDATE_NAME_DOCUMENTS_COMPLETED,
	UPDATE_TYPE_DOCUMENT
} from '../types/docsStatusTypes';

const initialState = { 
	status: false, 
	names: [], 
	id: null, 
	isUpdate: false
}

const documentsStatusReducer = ( state = initialState, action) => {
	switch(action.type){
		case UPDATE_DOCUMENTS_STATUS_COMPLETED:
			return {
				...state,
				status: action.payload
			}
		case UPDATE_NAME_DOCUMENTS_COMPLETED:
			return {
				...state,
				names: action.payload
			}
		case UPDATE_TYPE_DOCUMENT:
			return {
				...state,
				isUpdate: action.payload.isUpdate,
				id: action.payload.id
			}
		default :
			return state;
	}

}

export default documentsStatusReducer