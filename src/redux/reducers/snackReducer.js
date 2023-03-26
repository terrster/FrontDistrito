import { UPDATE_SNACK } from "../types/snackType";

const initialState = {
        open: false,
        msg: "",
};

export default function snackReducer (state = initialState, action) {
    switch (action.type) {
        case UPDATE_SNACK:
            return {
                ...state,
                open: action.payload.open,
                msg: action.payload.msg,
            };
        default:
            return state;
    }
}