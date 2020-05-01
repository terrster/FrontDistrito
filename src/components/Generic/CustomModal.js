import React from 'react';
import Modal from 'react-responsive-modal'
import { Row, Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux'

const CustomModal = props => {

	let closeModal = () => {
		props.updateModal('')
	}

	return (
		<Modal onClose={closeModal} open={ props.modal === `${props.modalName}` } style={{ padding: '30px 40px!important', width: 'auto!important' }}>
			<Row className="d-flex justify-content-center">
				<Col lg={6} sm={12} md={12} className="text-center">
					<div className="brandonReg fz29 blueDark fw400">
						{props.message}
					</div> 
				</Col>
			</Row>
			<div className="text-center mt-30">
				<Button className="btn-blue-general ml-auto mr-auto" onClick={closeModal}>
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
