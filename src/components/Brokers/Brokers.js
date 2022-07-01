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
const herramientas = [
    {
        id: 1,
        name: 'id exclusivo que te identifica como broker',
    },
    {
        id: 2,
        name: 'acceso único a nuestro CRM',
    },
    {
        id: 3,
        name: 'plan de capacitación semanal',
    },
    {
        id: 4,
        name: 'tarjeta de presentación digital',
    },
    {
        id: 5,
        name: 'herramientas de marketing y ventas',
    },
    {
        id: 6,
        name: 'acceso a biblioteca virtual',
    },
    {
        id: 7,
        name: 'y más',
    }
];
const necesitas = [
    {
        id: 1,
        name: 'gusto por las ventas',
    },
    {
        id: 2,
        name: 'conocimiento del sector pyme y/o hipotecario',
    },
    {
        id: 3,
        name: 'contar con cartera de prospectos',
    },
];

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
                <div className="metropolisReg fz21 blackBlue">
                adquiere tu <span style={{fontSize:'1.5rem', color:'#213970'}} className='title-dp'>membresía azul</span> por un <span style={{fontSize:'1.5rem', color:'#213970'}} className='title-dp'>pago único de $3,900 pesos</span> y recibe las mejores herramientas que te ayudarán a colocar más créditos, ser más rápido y generar más ingresos.

                {/* <br/> */}
                <br/>

                <div className="title-dp fz42 mt-1 fw500" style={{color:'#213970'}}>
                <span> herramientas </span> 
                </div>
                <ul className="list-broker">
                    {herramientas.map((item, index) => {
                        return(
                            <li key={index} className="fz21 blackBlue">
                                {item.name}
                            </li>
                        )
                    }
                    )}
                </ul>
                <div className="title-dp fz42 fw500 mb-1" style={{color:'#213970'}}>
                <span> ¿qué necesitas ? </span> 
                </div>
                <ul className="list-broker">
                    {necesitas.map((item, index) => {
                        return(
                            <li key={index} className="fz21 blackBlue">
                                {item.name}
                            </li>
                        )
                    }
                    )}
                </ul>
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