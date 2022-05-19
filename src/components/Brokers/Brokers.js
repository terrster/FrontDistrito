import React, { useEffect, useState } from "react";
import Title from '../Generic/Title';
import { Carousel, Container, Alert } from 'react-bootstrap'
import BrokersForms from "../../forms/BrokersForm";
import axios from '../../utils/axios';
import BANNER_WEB from '../../assets/img/brokers/banner_web.jpg';
import BANNER_MOVIL from '../../assets/img/brokers/banner_móvil.jpg';
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

            <div style={{maxHeight:'85vh', height:'100vh', overflow:'hidden'}}>

                    <img className="d-block w-100" src={images[versionImage]} alt="brokersbanner" />
            </div>
                
            <div className="title-dp fz42 fw500 mb-1 text-center mt-2" style={{color:'#213970'}}>
                <span style={{color:'#EF4E5B'}}> conviértete </span> en broker digital dp
            </div>

            <Container>
                <div className="metropolisReg fz21 text-justify blackBlue">
                adquiere tu <span style={{fontSize:'1.5rem', color:'#213970'}} className='title-dp'>membresía azul</span> por un <span style={{fontSize:'1.5rem', color:'#213970'}} className='title-dp'>pago único de $3,900 pesos</span> y recibe las mejores herramientas que te ayudarán a colocar más créditos, ser más rápido y generar más ingresos.

                <br/>
                <br/>

                <div className="title-dp fz42 mt-1 fw500" style={{color:'#213970'}}>
                <span> herramientas </span> 
                </div>
                • id exclusivo que te identifica como broker <br />
                • acceso único a nuestro CRM <br />
                • plan de capacitación semana <br />
                • tarjeta de presentación digital <br />
                • herramientas de marketing y ventas <br />
                • acceso a biblioteca virtual <br />
                • y más 
                <br />
                 <br />
                <div className="title-dp fz42 fw500 mb-1" style={{color:'#213970'}}>
                <span> ¿qué necesitas ? </span> 
                </div>
                • gusto por las ventas <br />
                • conocimiento del sector pyme y/o hipotecario <br />
                • contar con cartera de prospectos <br />
                </div>
                <br/>
        
                <div className="metropolisReg fz21 text-justify blackBlue">
                al registrarte recibirás toda la información en tu correo y nuestro equipo de atención a brokers digitales te contactará para que comiences ¡YA!
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