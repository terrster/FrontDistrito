import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Title from "../Generic/Title";
import ResetPasswordForm from "../../forms/ResetPasswordForm";
import CustomModal from "../Generic/CustomModal";

import axios from "../../utils/axios";
import Loader from "../Loader/Loader";

import {
  updateLoader
} from '../../redux/actions/loaderActions'
import {
  updateModal
} from '../../redux/actions/modalActions'
import {
  updateResetPassword
} from '../../redux/actions/resetPasswordActions'


const ResetPassword = (props) => {

  const dispatch = useDispatch();
  //updateResetPassword(false, "");
  const [statushash, setStatusHash] = useState(false);

  const onFormSubmit = async (payload) => {
    dispatch( updateLoader(true) );
    let validateHash = await axios.get("/validate_resetHash/" + payload.email);

    if(validateHash.data.code == 200){
      dispatch( updateModal('reset_password', 'Hash de recuperación activo, verifique su correo electrónico.') );
    }
    else{
      let {data} = await axios.post("/forgot_password", payload);

      if(data.code == 500){
        dispatch( updateModal('reset_password', 'Correo electrónico incorrecto') );
      }

      if(validateHash.data.code == 403){
        dispatch( updateModal('reset_password', 'Hash de recuperación vencido, se le generará otro. Verifique su correo electrónico.') );
      }

      if(validateHash.data.code == 404 && data.code == 200){
        dispatch( updateModal('reset_password', 'Hash de recuperación creado exitosamente. verifique su correo electrónico.') );
      }
    }
    /* this.props.updateLoader(true)
		let {email} = data
		try {
			let d = await ResetPassword({variables: {email}});
			let status = d.data.resetPassword.status;
			let text = 'Enviamos un correo electrónico a la siguiente direccion '+email+', Haz click en el enlace que aparece en el correo para restablecer tu contraseña. Si no ves el correo electrónico en tu bandeja de entrada, revisa tu carpeta de spam.';
			if(!status) text = 'El correo '+email+' no existe en nuestro sistema.';
			this.props.updateResetPassword(status, text);
            this.props.updateLoader(false)
		} catch (err) {
			this.props.updateLoader(false)
			this.props.updateModal('err')
    } */
    dispatch( updateLoader(false) );
  };
  window.scrollTo(0, 0);

  return (
    <div>
      <Loader/>
      {/* <CustomModal modalName="correo_incorrecto" message="Correo incorrecto" /> */}
      <CustomModal modalName="reset_password"/>
      <div
        className="container mt-30 mb-30 d-flex flex-column align-items-center"
        style={{ height: "600px" }}
      >
        <Title
          className="fz56 margin-top-titulo text-center blue-primary coolvetica fw500"
          title="Restablecer Contraseña"
        />
        {/* {!props.statusPassword.status &&
        props.statusPassword.text === "" ? ( */}
          <>
            <div className="mt-0 metropolisReg fw300 fz20 text-center mb-2 reduce-line">
              <label className="gray50">
                Te enviaremos un correo electrónico con instrucciones para
                restablecer tu contraseña.
              </label>
            </div>
            <ResetPasswordForm onSubmit={(data) => onFormSubmit(data)} />
          </>
        {/* ) : (
          <div className="mt-0 metropolisReg fw300 fz20 text-center mb-2">
            <label className="gray50 w-75 text-center">
              {props.statusPassword.text}
            </label>
          </div>
        )} */}
      </div>
    </div>
  );
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     statusPassword: state.resetPasswordStatus,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateLoader: (isLoading) => dispatch( updateLoader(isLoading)),
//     updateModal: (name) => dispatch( updateModal(name)),
//     updateResetPassword: (status, text) => dispatch(updateResetPassword(status, text))
//   };
// };

//export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
export default ResetPassword;

