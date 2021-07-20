import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Title from '../Generic/Title';
import '../../css/signup.css';
import registerImage from '../../assets/img/registroexitoso-01.png';
import Loader from "../Loader/Loader";
import { updateLoader } from '../../redux/actions/loaderActions';
import { useHistory } from 'react-router-dom';

let RegistroExitoso = (props) => {

	const dispatch = useDispatch();
	const history = useHistory();
	const [copy, setCopy] = useState(
		<>
			<Title className="title-dp fz42 mb-18 fw500" title="Registro Exitoso" />
			<p className="text-dp text-center">Bienvenido a la #ComunidadDeCrédito más grande de México.</p>
			<p className="text-dp">¡Es hora de iniciar tu solicitud!</p>
			<p className="text-dp text-center mb-50">Te recomendamos tener a la mano INE, Comprobante de Domicilio y Estados de <br /> Cuenta bancarios para poder aprobar tu crédito en 15 minutos</p>
		</>
	);

	if(sessionStorage.getItem("token") && props.match.params.partner === undefined){
		const user = JSON.parse(sessionStorage.getItem("user"));
		setTimeout(() => {
			history.push(`/elige-monto/${user._id}`);
		}, 4500)
	}
	
	useEffect(() => {
		dispatch ( updateLoader(false));

		if(props.match.params.partner !== undefined){
			switch(props.match.params.partner.toLowerCase()){
				case 'resuelvetudeuda':
					setCopy(
						<>
							<Title className="title-dp fz42 mb-18 fw500" title="¡Enhorabuena!" />
							<p className="text-dp mb-5">Pronto el equipo de <strong>Resuelve Tu Deuda</strong> te contactará para comenzar a reparar tu Buró de Crédito.</p>
						</>
					);
				break;
	
				default:
					setCopy(
						<>
							<Title className="title-dp fz42 mb-18 fw500" title="Registro Exitoso" />
							<p className="text-dp text-center">Bienvenido a la #ComunidadDeCrédito más grande de México.</p>
							<p className="text-dp">¡Es hora de iniciar tu solicitud!</p>
							<p className="text-dp text-center mb-5">Te recomendamos tener a la mano INE, Comprobante de Domicilio y Estados de <br /> Cuenta bancarios para poder aprobar tu crédito en 15 minutos</p>
						</>
					);
				break;
			}
		}
	},[]);

	return (
		<div className="container mt-30 registro-exitoso">
			<Loader />
			<img src={registerImage} alt="registerimage" style={{ width: '250px' }}/>
			{ copy }
		</div>
	)
}

export default RegistroExitoso;