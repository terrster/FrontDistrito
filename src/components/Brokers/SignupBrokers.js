import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../Generic/Title";
import SignupFormBrokers from "../../forms/SignupFormBrokers";
// import * as $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
//  import { execToast } from "../../utils/ToastUtils";
// import { Link } from "react-router-dom";
import "../../css/signup.css";
// import registerImage from "../../assets/img/register.png";
import Loader from "../Loader/Loader";
import { updateLoader } from '../../redux/actions/loaderActions';
import { singUpAction } from '../../redux/actions/authActions';
import { updateToast } from '../../redux/actions/appActions';
import axios from '../../utils/axios';
import StepSignup from "../Appliance/StepSignup";
import publicIp from "public-ip";

let SignupBrokers = props => {
	const toast = useSelector(state => state.app.toast);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorBroker, setErrorBroker] = useState("");

  const dispatch = useDispatch();

  let onFormSubmit = async (data) => {
    dispatch ( updateToast(toast, "register") );
    dispatch( updateLoader(true) );
    let ipV4 = await publicIp.v4();
    data.ipV4 = ipV4;

    const res = await axios.post('signin', data);
    if(res.data.code === 403){
      setErrorBroker(res.data.msg)
    }
    else if (res.data.code === 500){
      setErrorEmail(res.data.msg)
    } else {
      setErrorEmail("")
      setErrorBroker("")
      dispatch( singUpAction(data) );
    }
    dispatch (updateLoader(false));
  }

  if (sessionStorage.getItem("nameUser")) {
    setTimeout(() => {
      window.location = "/home";
    }, 5000)

  }
  else {
    return (
      <div className="container mt-30">
        <Loader />
        {!props.statusSingup ? (
          <>
            <Title
              className="fz56 text-center title-dp fw500"
              title="¡Bienvenido a Distrito Pyme!"
            />
            <div className="mt-30 text-dp fw300 fz20 text-center mb-30">
              <p className="gray50">Te ayudamos a crecer tu negocio <label className="blue-primary">&nbsp;#ComunidadDeCrédito&nbsp;</label></p>
            </div>
            <div className="mt-50">
							<StepSignup/>
						</div>
            <div className="mt-30 text-dp fw300 fz20 text-center mb-30">
              <p className="gray50">Recuerda realizar el registro con la información del Principal Accionista y/o Representante Legal</p>
            </div>
          </>
        ) : (
          <div></div>
        )}
        <SignupFormBrokers onSubmit={e => onFormSubmit(e)} errorEmail={errorEmail} setErrorEmail={setErrorEmail} errorBroker={errorBroker} setErrorBroker={setErrorBroker}/>
      </div>
    );
  }
};

export default SignupBrokers;
