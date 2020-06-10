import React, { useState } from 'react';
import Title from '../../Generic/Title'
import { Button, Row, Col} from 'react-bootstrap';

import "../../../css/doubts.css";
import titoLupa from '../../../assets/img/tito-lupa@2x.png'

const Doubts = () => {

	const [data, setData] = useState({ 
		email: { value: '', isValid: false },
		name: { value: '', isValid: false }
	});
	const [status, setStatus] = useState(false)

	const handleSend = async() => {

		console.log("Enviar email con estos datos:")
		console.log(data)

		/* let contactEmail = await this.props.sendEmailContact({variables: {
			from:this.state.data.email.value,
			to: "contacto@distritopyme.com",
			message:"Mensaje enviado desde DP",
			subject:this.state.data.name.value
        }});
        
		if(contactEmail.data.sendEmail.status){
			this.setState({status: true});
		} */
	}

	const handleChange = (e) => {
		let i = e.target;
		let newData = {
			email: data.email, 
			name: data.name
		};
		if(i.id === 'name'){
			newData.name.value = i.value;
			newData.name.isValid = false;
			if(newData.name.value.length > 5){
				newData.name.isValid = true;
			}
		}else if(i.id === 'email'){
			 newData.email.value = i.value;
			 newData.email.isValid = false;
			if(newData.email.value.length > 5 && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(i.value)){
				newData.email.isValid = true;
			}
		}
		setData(newData);
	}


	return (
		<div className="text-center" style={{marginBottom : '-10px'}}>
			<Title className="coolvetica fw500 fz38 blackBlue pt-3" title="¿Dudas?"/>
			<Title className="coolvetica fw500 fz38 mb-18 blackBlue" title="Déjanos tus datos"/>
			<div className="mr-auto ml-auto" style={{maxWidth : '1200px'}}>
				<Row className="justify-content-center">
					<Col lg={2}>
						<img className="d-lg-block d-none" src={titoLupa} width="150px" alt="Tito lupa" style={{marginTop : '10px'}} />
					</Col>
					<Col lg={7} className="d-flex justify-content-center">
						<form className="" style={{maxWidth : '560px', minWidth: '100%'}}>
							<div className="form-group">
								<input type="text" id="name" name="name" placeholder="Nombre completo" className="coolvetica fz20 mb24 input-doubt mb-2 mx-auto" onChange={handleChange}/>
								{
									!data.name.isValid && data.name.value &&
									<div className="error text-left ml-2">Ingresa un nombre mayor a 5 caracteres</div>
								}
								
							</div>
							<div className="form-group">
								<input type="text" id="email" name="email" placeholder="Correo electrónico" className="coolvetica fz20 input-doubt" onChange={handleChange}/>
								{
									!data.email.isValid && data.email.value &&
									<div className="error text-left ml-2">Ingrese un correo electrónico valido</div>
								}
							</div>
							{
								status ?
								<div className="mb-5">
									<div className="text-center mt-5 h4 opacity-50">Correo enviado Satisfactoriamente.</div>
									<div className="text-center mt-1  opacity-50">Pronto nos pondremos en contacto contigo.</div>
								</div>
								:
								<div className="form-group text-center text-lg-right">
									<Button className=" contact-button brandonReg fw500 white fz16 mt-24 mb-5 mb-lg-0" disabled={(data.email.isValid && data.name.isValid) ? false : true} onClick={handleSend}>¡Contáctenme!</Button>
								</div>
							}
						</form>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default Doubts