import {
	UPDATE_STATUS_RECOVER_PASSWORD,
	UPDATE_STATUS_RECOVER_PASSWORD_SUCCESS,
	UPDATE_STATUS_RECOVER_PASSWORD_ERROR
} from '../types/recoverPasswordTypes';

const initialState = {
	status: false,
	text: '',
	loading: false,
	error: null
}

const recoverPasswordReducer = ( state = initialState, action) => {
	switch(action.type){
		case UPDATE_STATUS_RECOVER_PASSWORD:
			return {
				...state,
				loading: true	
			}
		case UPDATE_STATUS_RECOVER_PASSWORD_SUCCESS:
			return {
				...state,
				status: action.payload.status,
				text: action.payload.text,
				loading: false
			}
		case UPDATE_STATUS_RECOVER_PASSWORD_ERROR:
			return {
				...state,
				error: action.payload,
				loadign: false
			}
		default :
			return state
	}

}

export default recoverPasswordReducer