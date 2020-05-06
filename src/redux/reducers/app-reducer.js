import {
  UPDATE_DATE,
  UPDATE_NAVBAR,
  UPDATE_DROPDOWN,
  UPDATE_TOAST,
  UPDATE_TOAST_REGISTER,
} from "../types/appTypes";

const initialState = {
  route: "landing",
  date: new Date(),
  dropdown: {
    amount: false,
    general: false,
    comercial: false,
    documents: false,
  },
  toast: {
    first: false,
    second: false,
    third: false,
    docs: false,
    register: false,
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAVBAR:
      return {
        ...state,
        route: action.payload,
      };
    case UPDATE_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case UPDATE_DROPDOWN:
		return {
			...state,
			dropdown: action.payload
		}
		// newState.dropdown[action.payload] = !newState.dropdown[action.payload]
    case UPDATE_TOAST:
	case UPDATE_TOAST_REGISTER:
		return {
			...state,
			toast: action.payload 
		}
//      newState.toast[action.data.key] = !newState.dropdown[action.data.key];
    default:
      return state;
  }
};

export default appReducer;
