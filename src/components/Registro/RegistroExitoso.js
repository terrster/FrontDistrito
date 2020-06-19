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
import registerImage from '../../assets/img/registroexitoso-01.png'
import TagManager from 'react-gtm-module'
import Loader from "../Loader/Loader";
import { updateLoader } from '../../redux/actions/loaderActions';

let RegistroExitoso = (props) => {

	const dispatch = useDispatch();

	if(sessionStorage.getItem("token")){
		const user = JSON.parse(sessionStorage.getItem("user"));
		setTimeout(() => {
		  window.location = `/elige-monto/${user._id}`;
		}, 4500)
	}
	
	useEffect(() => {
		dispatch ( updateLoader(false));
	},[]) 

	return (
		<div className="container mt-30 registro-exitoso">
			<Loader />
			<img src={registerImage} alt="registerimage" style={{ width: '250px' }}/>
			<Title className="title-dp fz42 mb-18 fw500" title="Registro Exitoso" />
			<p className="text-dp">Bienvenido a la #ComunidadDeCrédito más grande de México.</p>
			<p className="text-dp">¡Es hora de iniciar tu solicitud!</p>
			<p className="text-dp text-center mb-50">Te recomendamos tener a la mano INE, Comprobante de Domicilio y Estados de <br /> Cuenta bancarios para poder aprobar tu crédito en 15 minutos</p>
		</div>
	)
}

export default RegistroExitoso;
