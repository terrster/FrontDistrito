import {
	SET_CURRENT_SAME_ADDRESS
} from '../types/sameAddressTypes';

const initialState = {
	address: {}
}

const sameAddressReducer = ( state = initialState, action) => {
	switch(action.type){
		case SET_CURRENT_SAME_ADDRESS:
			return {
				...state,
				address: action.payload
			}
		default :
			return state
	}

}

export default sameAddressReducer