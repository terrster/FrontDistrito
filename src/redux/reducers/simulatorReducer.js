import {
	UPDATE_AMOUNT,
	UPDATE_AMOUNT_SUCCESS,
	UPDATE_AMOUNT_ERROR,
	UPDATE_CONT,
	UPDATE_CONT_SUCCESS,
	UPDATE_CONT_ERROR,
	UPDATE_STEP,
	UPDATE_STEP_SUCCESS,
	UPDATE_STEP_ERROR,
	UPDATE_TERM,
	UPDATE_TERM_SUCCESS,
	UPDATE_TERM_ERROR
} from '../types/simulatorTypes'

const initialState = {
	amount : 0, 
	term: 0, 
	step: 0, 
	cont: 0,
	loading: false,
	error: null
}

const simulatorReducer = ( state = initialState, action) => {
	switch(action.type){
		case UPDATE_AMOUNT:
		case UPDATE_CONT:
		case UPDATE_STEP:
		case UPDATE_TERM:
			return {
				...state,
				loading: true
			}
		case UPDATE_AMOUNT_ERROR:
		case UPDATE_CONT_ERROR:
		case UPDATE_STEP_ERROR:
		case UPDATE_TERM_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			}
		case UPDATE_AMOUNT_SUCCESS : 
			return {
				...state,
				loading: false,
				amount: action.payload
			}
		case UPDATE_TERM_SUCCESS :
			return {
				...state,
				loading: false,
				term: action.payload
			}
		case UPDATE_STEP_SUCCESS : 
			return {
				...state,
				loading: false,
				step: action.payload
			}
		case UPDATE_CONT_SUCCESS :
			return {
				...state,
				loading: false,
				cont: action.payload
			}
		default :
			return state
	}
}

export default simulatorReducer