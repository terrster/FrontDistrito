import React, { useEffect, useState } from "react";
import Title from '../Generic/Title';
import { Carousel, Container } from 'react-bootstrap'
import BrokersForms from "../../forms/BrokersForm";

import BANNER_WEB from '../../assets/img/brokers/broker_banner-2.jpg';
import BANNER_MOVIL from '../../assets/img/brokers/WEBMOVIL_2.jpg';

const images = [BANNER_WEB, BANNER_MOVIL];

const getVersionImage = () => {
    const currentSize = document.getElementsByTagName('body')[0].clientWidth;
    return currentSize < 775 ? 1 : 0;
};

const Brokers = () => {

    const [versionImage, setVersionImage] = useState(getVersionImage());

    window.addEventListener('resize', () => setVersionImage(getVersionImage()));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const initialValues = {
        name: '',
        // lastname: '',
        // secondlastname: '',
        email: '',
        mobilephone: '',
        zip: '',
        message: '',
        trm: false
    }

    const handleSubmit = async(values) => {
        // dispatch(updateLoader(true));
        console.log(values);
        // dispatch(updateLoader(false));
    }

    return(
        <>
            <Carousel  className="mb-2" controls={false} indicators={false}>
                <Carousel.Item>
                    <img className="d-block w-100" src={images[versionImage]} alt="brokersbanner" />
                </Carousel.Item>
            </Carousel>

            <Title title="Alta de Brokers" className="subtitle-dp fz42 fw500 mb-1 text-center" />

            <Container>
                <div className="metropolisReg fz12 blackBlue text-left">
                Nuestro plan de <b>Brokers Digital</b>, te permite adquirir una licencia exclusiva de <b>distritopyme.com</b> y las herramientas 
                necesarias para ayudarte a colocar más rápido
                y ofrecerle a tus clientes las mejores opciones de crédito.
                <br/>
                <br/>
                <Title title="¿Qué necesitas?" className="subtitle-dp fz22 mb-1" />
                • Gusto por las ventas. <br />
                • Conocimiento del sector pyme. <br />
                • Contar con cartera de prospectos. <br />
                </div>

                <Title title="Al registrarte recibirás toda la información en tu correo y nuestro equipo de Brokers Digitales 
                te contactará para que comiences ¡YA!" 
                className="subtitle-dp fz14 mt-3 mb-3" />

                <BrokersForms initialValues={initialValues} handleSubmit={handleSubmit}/>

            </Container>

            <style>{"\
                #clgo{\
                display: none !important;\
                }\
                #clgo-wsp{\
                display: none !important;\
                }\
                "}</style>
        </>
    );
}

export default Brokers;