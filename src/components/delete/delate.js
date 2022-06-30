import React, {useState} from 'react';
import { connect } from 'react-redux';
import Title from '../Generic/Title';
import DeleteForm from '../../forms/deleteForm';
import Loader from '../Loader/Loader';
import Alert from 'react-bootstrap/Alert'
import axios from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/authActions';
import { updateLoader } from '../../redux/actions/loaderActions';
import { Modal } from 'react-responsive-modal';
import { Row, Button, Col } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

const DeleteComp = props => {

	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [mmsg, setMmsg] = useState('');

	let onFormSubmit = async (data) => {
		dispatch ( updateLoader(true));
		const Request = await axios.post('delete', data);
		if (Request.data.code === 200){
			setOpen(true);
			setMmsg(Request.data.msg);
		} else {
			setOpen(true);	
			setMmsg(Request.data.msg);
		}
		dispatch ( updateLoader(false));
	}

	const auth = sessionStorage.getItem('token');

	window.scrollTo(0, 0)
	return (
		<>
			<div>
				<Loader />
				<Modal onClose={() => setOpen(false)} open={open} style={{ padding: '30px 40px!important', width: 'auto!important' }}>
					<Row className="d-flex justify-content-center">
						<Col lg={6} sm={12} md={12} className="text-center">
							<div className="metropolisReg fz29 blueDark fw400">
								{mmsg}
							</div> 
						</Col>
					</Row>
					<div className="text-center mt-30">
						<Button className="btn-blue-general ml-auto mr-auto" style={{width: '250px'}} onClick={() => setOpen(false)}>
							aceptar
						</Button>
					</div>
				</Modal>
				<div className="container mt-30 mb-30 d-flex flex-column align-items-center justify-content-center" style={{height : '600px'}}>
					<Title className="title-dp fz56 fw500" title="Eliminar Correo" />
					<div className="mt-30 subtitle-dp fw300 fz20 mb-30">
						<label className="gray50">al hacer click en aceptar eliminaras el correo y usuario de la base de datos</label>
					</div>
						<DeleteForm onSubmit={(e) => onFormSubmit(e,DeleteComp)} />
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

export default  DeleteComp /* connect(mapStateToProps, mapDispatchToProps)(Login) */
