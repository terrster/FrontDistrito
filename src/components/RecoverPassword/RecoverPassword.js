import React from 'react';
import { useSelector } from 'react-redux';
import Title from '../Generic/Title';
import RecoverPasswordForm from '../../forms/RecoverPasswordForm';
import CustomModal from '../Generic/CustomModal';

let RecoverPassword = props => {

	const { recoverPassword: { status, text } } = useSelector(state => state)

	return (
		<div>
			<CustomModal
				modalName="err"
				message="Correo incorrecto"
			/>
			<div className="container mt-30 mb-30 d-flex flex-column align-items-center justify-content-center" style={{height : '600px'}}>
				<Title className="fz56 text-center blue-primary coolvetica fw500" title="Restablecer Contraseña" />
				{
					(!status  && text === '') ?
					<>
					<div className="mt-0 brandonReg fw300 fz20 text-center mb-2">
						<label className="gray50">Ingresa una nueva contraseña</label>
					</div>
					<RecoverPasswordForm />
					</>
					:<div className="mt-0 brandonReg fw300 fz20 text-center mb-2 py-5">
						<label className="gray50">{text}</label>
					</div>
					}
			</div>
		</div>
		
	)
}

export default RecoverPassword;