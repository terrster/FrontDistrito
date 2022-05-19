import React, { useEffect, useState }  from 'react';
import Title from '../../Generic/Title'
import { Row, Col } from 'react-bootstrap';
import ContactForm from '../../../forms/ContactForm';
import axios from '../../../utils/axios';
import { useDispatch } from "react-redux";
import { updateLoader } from "../../../redux/actions/loaderActions";
import Loader from "../../Loader/Loader";
import "../../../css/doubts.css";
import chicaContacto from '../../../assets/img/chicaContacto.png'

const getHeight = () => {
	let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
	let isTablet = window.matchMedia("only screen and (max-width: 1024px)").matches;
	let isDesktop = window.matchMedia("only screen and (min-width: 1025px)").matches;

	if (isMobile) {
		return 1;
	} else if (isTablet) {
			return 2;
	} else if (isDesktop) {
			return 0;
	}
}

const Contact = (props) => {
	const dispatch = useDispatch();
	const [success, setSuccess] = useState({
		show: false,
		msg: ''
	});

	const [error, setError] = useState({
		show: false,
		msg: ''
	});

	const [height, setHeight] = useState(getHeight());

	useEffect(() => {
		window.scrollTo(0, 0);
		setHeight(getHeight());
	}, []);

	useEffect(() => {
        window.addEventListener('resize', () => setHeight(getHeight()));
        return () => {
            window.removeEventListener('resize', () => setHeight(getHeight()));
        }
    }  , []);

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
			<div className="mt-1" style={{width : '100%'}}>
				
				<div className="mr-auto ml-auto">
					<Row style={{margin:'0'}}>
						{
							height === 0 ?
								<>
									<Col style={{marginLeft:'5%'}} >
										<img src={chicaContacto} width="450px" alt="Tito lupa" style={{marginBottom : '0%'}} />
									</Col>
									<Col style={{marginLeft:'-5%'}}>
									<ContactForm initialValues={initialValues} handleSubmit={handleSubmit} error={error} success={success}/>
									</Col>
								</>:
								<>
									<Col>
									<ContactForm initialValues={initialValues} handleSubmit={handleSubmit} error={error} success={success}/>
									</Col>
								</>
						}
					</Row>
				</div>
			</div>
	</>
	)
}

export default Contact