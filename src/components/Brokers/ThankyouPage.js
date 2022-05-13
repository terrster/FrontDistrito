import React, { useEffect } from 'react';
import Title from '../Generic/Title';
import '../../css/signup.css';
import registerImage from '../../assets/img/enviado_chava-01.webp'
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

let ThankyouPage = () => {
    const history = useHistory();

	useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

	return (
		<div className="container mt-30 registro-exitoso">
			{/* <Loader /> */}
			<img src={registerImage} alt="registerimage" style={{ width: '250px' }}/>
			<Title className="title-dp fz42 mb-18 fw500" title="¡solicitud enviada!" />
			<p className="text-dp text-center">te hemos enviado un correo con información detallada de nuestro plan brokers.</p>
            <div>
                <Button className={"btn-blue-general mb-5 pl-5 pr-5"} onClick={() => history.push("/")}>cerrar</Button>
            </div>
		</div>
	)
}

export default ThankyouPage;
