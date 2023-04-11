import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Title from '../Generic/Title';
import '../../css/signup.css';
import registerImage from '../../assets/img/enviado_chava-01.webp';
import Loader from "../Loader/Loader";
import { updateLoader } from '../../redux/actions/loaderActions';
import { useHistory } from 'react-router-dom';

async function run() {
	while (true) {
	  console.log('Running...');
	  await new Promise(resolve => setTimeout(resolve, 1000));
	}
  }

let RegistroExitoso = (props) => {

	const dispatch = useDispatch();
	const history = useHistory();
	const [copy, setCopy] = useState(
		<>
			<Title className="title-dp fz42 mb-18 fw500" title="Registro Exitoso" />
			<p className="text-dp text-center">bienvenido a la #comunidaddecrédito más grande de México.</p>
			<p className="text-dp">¡es hora de iniciar tu solicitud!</p>
			<p className="text-dp text-center mb-50">te recomendamos tener a la mano INE, Comprobante de Domicilio y Estados de <br /> Cuenta bancarios para poder ofrecerte las mejores opciones de crédito en menos de 15 minutos</p>
		</>
	);

	useEffect(() => {
		if(sessionStorage.getItem("token") && props.match.params.partner === undefined){
		const user = JSON.parse(sessionStorage.getItem("user"));
		setTimeout(() => {
			history.push(`/ciec/${user._id}`);
		}, 4500)
	}
		
	},[]);
	
	
	useEffect(() => {
		dispatch ( updateLoader(false));

		if(props.match.params.partner !== undefined){
			switch(props.match.params.partner.toLowerCase()){
				case 'resuelvetudeuda':
					setCopy(
						<>
							<Title className="title-dp fz42 mb-18 fw500" title="¡Enhorabuena!" />
							<p className="text-dp mb-5">pronto el equipo de <strong>resuelve tu Deuda</strong> te contactará para comenzar a reparar tu Buró de Crédito.</p>
						</>
					);
				break;
	
				default:
					setCopy(
						<>
							<Title className="title-dp fz42 mb-18 fw500" title="Registro Exitoso" />
							<p className="text-dp text-center">bienvenido a la #comunidaddeCrédito más grande de México.</p>
							<p className="text-dp">¡es hora de iniciar tu solicitud!</p>
							<p className="text-dp text-center mb-5">te recomendamos tener a la mano INE, Comprobante de Domicilio y Estados de <br /> Cuenta bancarios para poder ofrecerte las mejores opciones de crédito en menos de 15 minutos</p>
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