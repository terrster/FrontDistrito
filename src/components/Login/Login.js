import React, {useState} from 'react';
import { connect } from 'react-redux';
import Title from '../Generic/Title';
import SigninForm from '../../forms/SigninForm';
import Loader from '../Loader/Loader';
import Alert from 'react-bootstrap/Alert'
import axios from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/authActions';
import { updateLoader } from '../../redux/actions/loaderActions';
import { Modal } from 'react-responsive-modal';
import { Row, Button, Col } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

const Login = props => {

	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	let onFormSubmit = async (data) => {
		dispatch ( updateLoader(true));
		const loginRequest = await axios.post('login', data);
		if (loginRequest.data.code === 200){
			dispatch( loginAction(loginRequest.data) );

			if(props.match.params.redirect){
				window.location.replace(`/${props.match.params.redirect}`);
			}
			else{
				window.location.replace("/credito");
			}
		} else {
			setOpen(true);	
		}
		dispatch ( updateLoader(false));
	}

	const auth = sessionStorage.getItem('token');

	window.scrollTo(0, 0)
	return (
		<>
			{
				auth &&
				<Redirect to="/credito"/>
			}
			<div>
				<Loader />
				<Modal onClose={() => setOpen(false)} open={open} style={{ padding: '30px 40px!important', width: 'auto!important' }}>
					<Row className="d-flex justify-content-center">
						<Col lg={6} sm={12} md={12} className="text-center">
							<div className="metropolisReg fz29 blueDark fw400">
								Correo y/o contraseña incorrectos
							</div> 
						</Col>
					</Row>
					<div className="text-center mt-30">
						<Button className="btn-blue-general ml-auto mr-auto" style={{width: '250px'}} onClick={() => setOpen(false)}>
							Aceptar
						</Button>
					</div>
				</Modal>
				<div className="container mt-30 mb-30 d-flex flex-column align-items-center justify-content-center" style={{height : '600px'}}>
					<Title className="title-dp fz56 fw500" title="Inicia sesión" />
					<div className="mt-30 subtitle-dp fw300 fz20 mb-30">
						<label className="gray50">Ingresa tu correo y contraseña para comenzar</label>
					</div>
						<SigninForm onSubmit={(e) => onFormSubmit(e,Login)} />
				</div>
			</div>
		</>
	);
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
