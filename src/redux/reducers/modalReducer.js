import { 
	UPDATE_MODAL,
	UPDATE_MODAL_ERROR,
	UPDATE_MODAL_SUCCESS
} from '../types/modalTypes';

const initialState = {
	name: '',
	error: '',
	loading: false
}

const modalReducer = ( state = initialState, action) => {
	switch(action.type){
		case UPDATE_MODAL: 
			return {
				...state,
				loading: true
			}
		case UPDATE_MODAL_SUCCESS:
			return {
				...state,
				loading: false,
				name: action.payload
			}
		case UPDATE_MODAL_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			}
		default :
			return state;
	}

}

export default modalReducer