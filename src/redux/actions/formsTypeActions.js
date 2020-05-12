import { UPDATE_DATA_AND_TYPE_FORM } from "../types/formsTypes";

export const changeTypeGeneralInfoForm = (form, type, datos) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_DATA_AND_TYPE_FORM,
      data: {
        form,
        type,
        datos,
      },
    });
  };
};
