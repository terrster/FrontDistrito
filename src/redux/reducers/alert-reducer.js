import { UPDATE_ALERT_MSG } from '../types/alertTypes'
const initialState = {
	status: false,
	names: ''
}
const alertReducer = ( state = initialState, action) => {
	switch(action.type){
		case UPDATE_ALERT_MSG:
            return {
				...state,
				status: action.payload.status,
				names: action.payload.names
			}
		default :
			return state
	}

}

export default alertReducer