import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { updateSnackbar } from "../../redux/actions/snackActions";
import { makeStyles } from "@material-ui/core/styles";

const Snack = () => {
    const { msg, open } = useSelector((state) => state.snack);
    const snack = useSelector((state) => state.snack);
    const dispatch = useDispatch();
    const hideDuration = 3000;

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                snack.open = false;
                dispatch(updateSnackbar(false, ""));
            }, hideDuration);
        }
    }, [open]);

    return (
        <Snackbar
        open={open}
        message={msg}
        autoHideDuration={hideDuration}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        />
    );
    };

export default Snack;