import React from 'react';
import { connect } from 'react-redux';
import Title from '../Generic/Title';
import SigninForm from '../../forms/SigninForm';
import CustomModal from '../Generic/CustomModal';

import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/authActions';

let Login = props => {

	const dispatch = useDispatch();

	let onFormSubmit = (data) => {
		/* props.updateLoader(true) */
		dispatch( loginAction(data) );
	}

	const auth = useSelector(state => state.auth.logged);

	if(auth){
		props.history.push("/home")
		/* props.updateLoader(false) */
		/* props.updateNav("login") */
	}
	else{
		/* props.updateLoader(false) */
		/* props.updateModal('err') */
	}


	window.scrollTo(0, 0)
	if(sessionStorage.getItem('user')){
		window.location="/home";
	}else{
		return (
			<div>
				<CustomModal
					modalName="err"
					message="Correo y/o contraseña incorrectos"
				/>
				<div className="container mt-30 mb-30 d-flex flex-column align-items-center justify-content-center" style={{height : '600px'}}>
					<Title className="fz56 text-center blue-primary coolvetica fw500" title="Inicia sesión" />
					<div className="mt-30 brandonReg fw300 fz20 text-center mb-30">
						<label className="gray50">Ingresa tu correo y contraseña para comenzar</label>
					</div>
					
						<SigninForm onSubmit={(e) => onFormSubmit(e,Login)} />
				</div>
			</div>
			
		)
	}	
	
}

/* const mapStateToProps = (state, ownProps) => {
	return {
		history : ownProps.history
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateLoader : (isLoading) => {
			dispatch({type : "UPDATE_LOADER", data : {isLoading}})
		},
		updateNav : (route) => {
			dispatch({ type : "UPDATE_NAVBAR", data : {route}})
		},
		updateModal : (name) => {
			dispatch({type : "UPDATE_MODAL", data : {name}})
		}
	}
} */

export default  Login /* connect(mapStateToProps, mapDispatchToProps)(Login) */