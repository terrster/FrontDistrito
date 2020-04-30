import {
	UPDATE_STATUS_PASSWORD
} from '../types/resetPasswordTypes';

const initialState = {
	status: false,
	text: ''
}

const resetPasswordReducer = ( state = initialState, action) => {
	
	
	switch(action.type){
		case UPDATE_STATUS_PASSWORD:
            return {
				...state,
				status: action.payload.status,
				text: action.payload.text
			}
		default :
			return state
	}

}

export default resetPasswordReducer