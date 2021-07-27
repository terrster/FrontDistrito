import React, { useEffect, useState }  from 'react';
import Title from '../../Generic/Title'
import { Row, Col } from 'react-bootstrap';
import ContactForm from '../../../forms/ContactForm';
import axios from '../../../utils/axios';
import { useDispatch } from "react-redux";
import { updateLoader } from "../../../redux/actions/loaderActions";
import Loader from "../../Loader/Loader";
import "../../../css/doubts.css";
import titoLupa from '../../../assets/img/tito-lupa@2x.png'

const Contact = () => {
	const dispatch = useDispatch();
	const [success, setSuccess] = useState({
		show: false,
		msg: ''
	});

	const [error, setError] = useState({
		show: false,
		msg: ''
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const initialValues = {
		name: '',
		email: '',
		message: ''
	}

	const handleSubmit = async (values) => {
		dispatch(updateLoader(true));

		let { data } = await axios.post('/contact', values);

		if (data.code === 200) {
			setSuccess({
				show: true,
				msg: data.msg
			});
			setTimeout(() => {
				setSuccess({
					msg: '',
					show: false
				})
			}, 5000);
		}
		else {
			setError({
				show: true,
				msg: data.msg
			});
			setTimeout(() => {
				setError({
					msg: '',
					show: false
				})
			}, 5000);
		}

		dispatch(updateLoader(false));
	}

	return (
	<>
		<Loader />
			<div className="text-center mt-3">
				<Title className="title-dp fw500 fz38" title="¡Contáctanos!"/>
				<div className="mr-auto ml-auto mt-5" style={{maxWidth : '1200px'}}>
					<Row className="justify-content-center">
						<Col lg={2}>
							<img className="d-lg-block d-none" src={titoLupa} width="150px" alt="Tito lupa" style={{marginTop : '10px'}} />
						</Col>
						<Col lg={7} className="d-flex justify-content-center">
							<ContactForm initialValues={initialValues} handleSubmit={handleSubmit} error={error} success={success}/>
						</Col>
					</Row>
				</div>
			</div>
	</>
	)
}

export default Contact