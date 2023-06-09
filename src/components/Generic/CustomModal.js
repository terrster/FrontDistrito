import React from 'react';
import Modal from 'react-responsive-modal'
import { Row, Button, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import {
	updateModal
  } from '../../redux/actions/modalActions';

const CustomModal = () => {

	const modal = useSelector(state => state.modal);
	const dispatch = useDispatch();

	let closeModal = () => {
		dispatch( updateModal('') );
	}

	return (
		<Modal onClose={closeModal} open={`${modal.name}` } style={{ padding: '30px 40px!important', width: 'auto!important' }}>
			<Row className="d-flex justify-content-center">
				<Col lg={6} sm={12} md={12} className="text-center">
					<div className="metropolisReg mt-3 fz29 fw400">
						{modal.message}
					</div> 
				</Col>
			</Row>
			<div className="text-center mt-30">
				<Button className="btn-blue-general ml-auto mr-auto" onClick={closeModal} style={{width: '250px'}}>
					Aceptar
				</Button>
			</div>
			
		</Modal>
	)
}


/* const mapStateToProps = (state, ownProps) => {
	return {
		modal : state.modal.name,
		history : ownProps.history
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateModal : ( name ) => {
			dispatch({ type : "UPDATE_MODAL", data : { name }})
		}
	}
} */

export default  CustomModal /* connect(mapStateToProps, mapDispatchToProps)(CustomModal) */
