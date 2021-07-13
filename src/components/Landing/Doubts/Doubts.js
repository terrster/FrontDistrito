import React, { useEffect, useState }  from 'react';
import Title from '../../Generic/Title'
import { Button, Row, Col} from 'react-bootstrap';
import HomeForm from '../../../forms/HomeForm';
import axios from '../../../utils/axios';
import { useDispatch } from "react-redux";
import { updateLoader } from "../../../redux/actions/loaderActions";
import "../../../css/doubts.css";
import titoLupa from '../../../assets/img/tito-lupa@2x.png'

const Doubts = () => {
	const dispatch = useDispatch();
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
			// mostrar modal
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
		<div className="text-center mt-5"  style={{marginBottom : '-10px'}}>
			<Title className="title-dp fw500 fz38 pt-3" title="¡Contáctanos!"/>
			<Title className="title-dp fw500 fz38 mb-18" title="Déjanos tus datos"/>
			<div className="mr-auto ml-auto" style={{maxWidth : '1200px'}}>
				<Row className="justify-content-center">
					<Col lg={2}>
						<img className="d-lg-block d-none" src={titoLupa} width="150px" alt="Tito lupa" style={{marginTop : '10px'}} />
					</Col>
					<Col lg={7} className="d-flex justify-content-center">
						<HomeForm initialValues={initialValues} handleSubmit={handleSubmit}/>
					</Col>
					
				</Row>
			</div>
		</div>
	)
}

export default Doubts