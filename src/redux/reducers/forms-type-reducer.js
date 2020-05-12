import {
	UPDATE_DATA_AND_TYPE_FORM
} from '../types/formsTypes';

const initialState = { 
	amountForm: {
		type: 'create', 
		datos:{}
	}, 
	comercialInfoForm:{
		type:'create', 
		datos:{}
	}, 
	generalInfoForm:{
		type:'create', 
		datos:{}
	} 
}

const formsTypeReducer = ( state = initialState, action) => {
	let newState = Object.assign({},state)
	switch(action.type){
		case UPDATE_DATA_AND_TYPE_FORM:
            newState[action.data.form].type = action.data.type
			newState[action.data.form].datos = action.data.datos
			return newState
		default :
			return state
	}

}

export default formsTypeReducer