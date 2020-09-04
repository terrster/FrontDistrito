import React from 'react';
import Title from '../Generic/Title';
import '../../css/signup.css';
import registerImage from '../../assets/img/registroexitoso-01.png'
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

let ThankyouPage = () => {
    const history = useHistory();

	return (
		<div className="container mt-30 registro-exitoso">
			{/* <Loader /> */}
			<img src={registerImage} alt="registerimage" style={{ width: '250px' }}/>
			<Title className="title-dp fz42 mb-18 fw500" title="¡Solicitud Enviada!" />
			<p className="text-dp text-center">Te hemos enviado un correo con información detallada de nuestro Plan Brokers.</p>
            <div>
                <Button className={"btn-blue-general mb-5 pl-5 pr-5"} onClick={() => history.push("/")}>Cerrar</Button>
            </div>
		</div>
	)
}

export default ThankyouPage;
