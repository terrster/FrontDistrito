import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../Generic/Title";
import SignupForm from "../../forms/SignupForm";
import * as $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
 import { execToast } from "../../utils/ToastUtils";
//import signupReducer from "../../redux/reducers/signup-reducer"; 
import { Link } from "react-router-dom";
import "../../css/signup.css";
import registerImage from "../../assets/img/register.png";
//import RegistroExitoso from "../../components/Registro/RegistroExitoso";
import Loader from "../Loader/Loader";
import { updateLoader } from '../../redux/actions/loaderActions';
import { singUpAction } from '../../redux/actions/authActions';
import { updateToast } from '../../redux/actions/appActions';
import axios from '../../utils/axios';

let Signup = props => {
	const toast = useSelector(state => state.app.toast);
	const [errorEmail, setErrorEmail] = useState("");
  //  let onFormSubmit = async (data,Login,Signup) => {
  //   props.updateLoader(true);
  //   try {
  //     let variables = ''  variablesManager.createSignupVariables(data) ;
  //     await Signup({ variables });
  //     props.updateSignupState(true);
  //     props.updateToast(true);
  //    let loginUser = await Login({
  //       variables: {
  //         email: variables.email,
  //         password: variables.password
  //       }
  //     });
  //     sessionStorage.setItem("token", loginUser.data.signin.token);
  //     sessionStorage.setItem("nameUser", loginUser.data.signin.user.name);
  //     props.updateLoader(false)
  //   } catch (err) {
  //     let errors =  0  errorManager.handleError(err) ;
  //     if (errors.length > 0) {
  //       $("#ymb-dp-signup-email-used").removeClass("d-none");
  //     }
  //     props.updateToast(true);
  //     props.updateLoader(false);
  //   }
  // };

  // let handleToLogin = () => {
  //   props.history.push("/login");
  //   props.updateSignupState(false);
  //   props.updateToast(true);
  // }; 

  const dispatch = useDispatch();

  let onFormSubmit = async (data) => {
	dispatch ( updateToast(toast, "register") );
	dispatch( updateLoader(true) );
	const res = await axios.post('signin', data);
	if (res.data.code === 500){
		setErrorEmail(res.data.msg)
	} else {
		setErrorEmail("");
		dispatch( singUpAction(data) );
	}
	dispatch (updateLoader(false));
  }

  //sessionStorage.removeItem("nameUser")

  if (sessionStorage.getItem("nameUser")) {
    setTimeout(() => {
      window.location = "/home";
    }, 5000)
    //return (<RegistroExitoso />);
  }else {
    return (
      <div className="container mt-30">
        <Loader />
        {!props.statusSingup ? (
          <>
            <Title
              className="fz56 text-center blue-primary coolvetica fw500"
              title="¡Bienvenido a Distrito Pyme!"
            />
            <div className="mt-30 brandonReg fw300 fz20 text-center mb-30">
              <label className="gray50">Bienvenido a la</label>
              <label className="blue-primary">&nbsp;#ComunidadDeCrédito</label>
              <label className="gray50">&nbsp;más grande de México</label>
              <br />
              <label className="gray50">
                &nbsp;que ayuda a empresas mexicanas a continuar creciendo
              </label>
            </div>
          </>
        ) : (
          <div></div>
        )}
        <SignupForm onSubmit={e => onFormSubmit(e)} errorEmail={errorEmail} setErrorEmail={setErrorEmail}/>
      </div>
    );
  }
};
//window.scrollTo(0, 0);
/* const mapStateToProps = (state, ownProps) => {
  return {
    history: ownProps.history,
    toast: state.app.toast,
    statusSingup: state.signupReducer.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLoader: isLoading => {
      dispatch({ type: "UPDATE_LOADER", data: { isLoading } });
    },
    updateToast: status => {
      dispatch({ type: "UPDATE_TOAST_REGISTER", data: { status } });
    },
    updateSignupState: status => {
      dispatch({ type: "UPDATE_SIGNPU_STATUS", data: { status } });
    }
  };
}; */

export default Signup;
