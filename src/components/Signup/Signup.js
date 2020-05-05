import React from "react";
//import { connect } from "react-redux";
import Title from "../Generic/Title";
import SignupForm from "../../forms/SignupForm";
import * as $ from "jquery";
/*import "react-toastify/dist/ReactToastify.css";
 import { execToast } from "../../utils/ToastUtils";
import signupReducer from "../../redux/reducers/signup-reducer"; 
import { Link } from "react-router-dom";*/
import "../../css/signup.css";
import registerImage from "../../assets/img/register.png";
//import RegistroExitoso from "../../components/Registro/RegistroExitoso";
import { useDispatch, useSelector } from 'react-redux';

import { singUpAction } from '../../redux/actions/authActions';

let Signup = props => {
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

  let onFormSubmit = (data) => {
    dispatch( singUpAction(data) );
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
        <SignupForm onSubmit={e => onFormSubmit(e)} />
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