import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-responsive-modal'
import { Row, Button, Col } from 'react-bootstrap';
import { updateModal } from '../../redux/actions/modalActions';

const CustomModal = props => {

	const dispatch = useDispatch();
	const { modal: { name } } = useSelector(state => state);

	let closeModal = () => {
		dispatch( updateModal('') )
	}

	return (
		<Modal onClose={closeModal} open={ name === `${props.modalName}` } style={{ padding: '30px 40px!important', width: 'auto!important' }}>
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

export default CustomModal