import React, { useState, useLayoutEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../Generic/Title';
import RecoverPasswordForm from '../../forms/RecoverPasswordForm';
import CustomModal from '../Generic/CustomModal';

import axios from "../../utils/axios";
import Loader from "../Loader/Loader";
import { updateLoader } from '../../redux/actions/loaderActions';
import { updateModal } from '../../redux/actions/modalActions';

let RecoverPassword = props => {
	const dispatch = useDispatch();
	const [isValidHash, setValidationHash] = useState(false);

	useLayoutEffect(async() => {
		dispatch( updateLoader(true) );

		let {data} = await axios.get("/validate_resetHash/" + props.match.params.hash);

		if(data.code == 200){
			setValidationHash(true);
		}

		dispatch( updateLoader(false) );

	}, []);

	const { recoverPassword: { status, text } } = useSelector(state => state)

	return (
		<div>
			<Loader/>
			<CustomModal modalName="recover_password"/>
			<div className="container mt-30 mb-30 d-flex flex-column align-items-center justify-content-center" style={{height : '600px'}}>
				<Title className="fz56 text-center title-dp fw500" title="Restablecer Contraseña" />
				{
					(isValidHash) ?
					<>
					<div className="mt-0 metropolisReg fw300 fz20 text-center mb-2">
						<label className="gray50">Ingresa una nueva contraseña</label>
					</div>
					<RecoverPasswordForm />
					</>
					:<div className="mt-0 metropolisReg fw300 fz20 text-center mb-2 py-5">
						<label className="gray50">El hash de recuperación es inválido, por favor genere uno nuevo haciendo clic <a href="/reset-password">aquí</a></label>
					</div>
					}
			</div>
		</div>
		
	)
}

export default RecoverPassword;