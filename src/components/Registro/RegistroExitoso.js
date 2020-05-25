import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import Title from '../Generic/Title';
import SignupForm from '../../forms/SignupForm';
/* import { Mutation } from 'react-apollo'
import Mutations from '../../utils/Mutations' 
import { errorManager } from '../Manager/ErrorManager';
import { variablesManager } from '../Manager/VariablesManager';*/
import * as $ from 'jquery';
/* import 'react-toastify/dist/ReactToastify.css'; */
import '../../css/signup.css';
import registerImage from '../../assets/img/register.png'
import TagManager from 'react-gtm-module'
import Loader from "../Loader/Loader";
import { updateLoader } from '../../redux/actions/loaderActions';

let RegistroExitoso = (props) => {

	const dispatch = useDispatch();

	if(sessionStorage.getItem("token")){
		const user = JSON.parse(sessionStorage.getItem("user"));
		setTimeout(() => {
		  window.location = `/elige-monto/${user._id}`;
		}, 4000)
	}
	
	useEffect(() => {
		dispatch ( updateLoader(false));
	},[]) 

	return (
		<div className="container mt-30">
			<Loader />
			<Title className="fz56 text-center blue-primary coolvetica fw500" title="Registro Exitoso" />
			<div className="mt-30 brandonReg fw300 fz20 text-center mb-30">
				<label className="gray50">Será redireccionado a la página principal por favor espere...</label>
				<label className="gray50">Bienvenido a la</label><label className="blue-primary">&nbsp;#ComunidadDeCrédito</label><label className="gray50">&nbsp;más grande de México.</label>
				<br />
				<label className="gray50">A partir de este momento pon mucha atención a tu correo,<br />
					ahí te estaremos compartiendo todos los detalles de tu crédito.</label>
			</div>
			<div className="container  d-flex align-items-center flex-column">
				<div className="mt-1 brandonReg fw300 fz20 text-center mb-3 d-flex flex-column justify-content-center align-items-center">
					<img src={registerImage} alt="registerimage" style={{ width: '200px' }} />
					<label className="gray50">No olvides tener a la mano tu INE, comprobante de domicilio y estados<br /> de cuenta bancarios para poder aprobar tu crédito en 15 minutos.</label>
				</div>
			</div>
		</div>
	)
}

/* const mapStateToProps = (state, ownProps) => {
	return {
		history : ownProps.history,
		toast: state.app.toast,
		statusSingup: state.signupReducer.status
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateLoader : (isLoading) => {
			dispatch({type : "UPDATE_LOADER", data : {isLoading}})
		},
		updateToast : (status) => {
			dispatch({type : "UPDATE_TOAST_REGISTER", data : {status}})
		},
		updateSignupState : (status) => {
			dispatch({type : "UPDATE_SIGNPU_STATUS", data : {status}})
		}
	}
} */

export default/*  connect(mapStateToProps, mapDispatchToProps)( */RegistroExitoso/* ) */
