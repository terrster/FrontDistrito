import React, { useEffect, useState } from "react";
import Title from '../Generic/Title';
import { Carousel, Container, Alert } from 'react-bootstrap'
import BrokersForms from "../../forms/BrokersForm";
import axios from '../../utils/axios';
import BANNER_WEB from '../../assets/img/brokers/broker_banner-2.jpg';
import BANNER_MOVIL from '../../assets/img/brokers/WEBMOVIL_2.jpg';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateLoader } from "../../redux/actions/loaderActions";
import Loader from "../Loader/Loader";

const images = [BANNER_WEB, BANNER_MOVIL];

const getVersionImage = () => {
    const currentSize = document.getElementsByTagName('body')[0].clientWidth;
    return currentSize < 775 ? 1 : 0;
};

const Brokers = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [versionImage, setVersionImage] = useState(getVersionImage());
    const [error, setError] = useState({
        show: false,
        msg: ''
    });

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
        dispatch(updateLoader(true));
        
        let {data} = await axios.post('broker', values);

        if(data.code === 200){
            window.scrollTo(0, 0);
            history.push("/solicitud_enviada_brokers");
        }
        else{
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

    return(
        <>
            <Loader/>

            <Carousel className="mb-2" controls={false} indicators={false}>
                <Carousel.Item>
                    <img className="d-block w-100" src={images[versionImage]} alt="brokersbanner" />
                </Carousel.Item>
            </Carousel>

            <Title title="Conviértete en Broker Digital DP" className="title-dp fz42 fw500 mb-1 text-center" />

            <Container>
                <div className="metropolisReg fz12 blackBlue text-justify">
                Nuestro programa de Brokers Digitales, te permite adquirir una membresía exclusiva de nuestra plataforma y las herramientas necesarias que te ayudarán a colocar más créditos y aumentar tus ingresos; todo en menos de 15 minutos.

                <br/>
                <br/>

                <Title title="Herramientas" className="subtitle-dp fz22 mb-1" />
                • ID exclusivo que te identifica como broker <br />
                • Acceso a nuestro CRM <br />
                • Capacitación continua <br />
                • Plan de marketing y desarrollo de tu propia marca <br />
                • Tarjeta de presentación digital <br />
                • Y más <br />

                <br/>
                <Title title="¿Qué necesitas?" className="subtitle-dp fz22 mb-1" />
                • Gusto por las ventas <br />
                • Conocimiento del sector pyme <br />
                • Contar con cartera de prospectos <br />
                </div>
                <br/>
        
                <div className="metropolisReg fz12 blackBlue text-justify">
                Al registrarte recibirás toda la información en tu correo y nuestro equipo de Atención a Brokers Digitales te contactará para que comiences ¡YA!
                </div>
                <br/>
                
                <BrokersForms initialValues={initialValues} handleSubmit={handleSubmit}/>

                {
                    error.show &&
                    <Alert variant="danger">
                        <strong>{error.msg}</strong>
                    </Alert>
                }

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