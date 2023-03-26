import { UPDATE_SNACK } from "../types/snackType";

export function updateSnackbar(open, msg) {
    return (dispatch) => {
        dispatch(activeSnack({ open, msg }));
    };
    }

const activeSnack = (snack) => ({
    type: UPDATE_SNACK,
    payload: snack,
});

