import {
  UPDATE_APPLIANCE,
  UPDATE_AMOUNT_APPLIANCE,
  UPDATE_COMERCIAL,
  UPDATE_DOCUMENTS,
  UPDATE_GENERAL,
} from "../types/applianceTypes";

const initialState = {
  appliance: "",
  amount: "",
  comercialInfo: "",
  generalInfo: "",
  documents: "",
  lastAddress: {},
};

const applianceReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_APPLIANCE:
      return {
        ...state,
        appliance: action.payload,
      };
    case UPDATE_AMOUNT_APPLIANCE:
      return {
        ...state,
        amount: action.payload,
      };
    case UPDATE_COMERCIAL:
      return {
        ...state,
        comercialInfo: action.payload,
      };
    case UPDATE_GENERAL:
      return {
        ...state,
        generalInfo: action.payload,
      };
    case UPDATE_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
      };
    default:
      return state;
  }
};
export default applianceReducer;
