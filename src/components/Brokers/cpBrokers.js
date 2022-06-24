import React, { useEffect, useState, useCallback } from "react";
import io from 'socket.io-client';
import AlliesLanding from "../Landing/AlliesLanding/AlliesLanding";
import Info from '../BrokersLanding/Info/Info';
import Cards from '../BrokersLanding/Cards/Cards';
import Comunity from '../BrokersLanding/Comunity/Comunity';
import Title from '../Generic/Title';
import { Carousel, Container, Alert } from 'react-bootstrap'
import BrokersForms from "../../forms/BrokersForm";
import axios from '../../utils/axios';
import BANNER_WEB from '../../assets/img/brokers-landing/BANNER_web.webp';
import BANNER_MOVIL from '../../assets/img/brokers-landing/BANNER_movil.webp';
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
    const [version, setVersion] = useState(getVersionImage());
    const [socket, setSocket] = useState(null);
    const [hubspotInfo, setHubspotInfo] = useState({
      Colocado: 0,
      ColocadoFormatted: 0,
      Pymes: 0,
      Brokers: 0,
      Alianzas: 0,
      Solicitudes: 0
    });
    const connectSocket = useCallback(() => {//process.env.REACT_APP_BACKEND, https://apidev.distritopyme.com/
      const socket = io.connect(process.env.REACT_APP_BACKEND, {
        transports: ['websocket'],
        autoConnect: true,
        forceNew: true,
        query: {
          'origin': 'hubspotInfo'
        }
      });
      setSocket(socket);
    }, []);
  
    useEffect(() => {
      connectSocket();
    }, []);
  
    useEffect(() => {
      if (socket) {
  
        socket.on('hubspotInfo', (callback) => {
          callback.data.ColocadoFormatted = callback.data.Colocado;
          callback.data.Colocado = callback.data.ColocadoFormatted.replace(/[$,.]/g, "");
          setHubspotInfo(callback.data);
        });
  
      }
    }, [socket]);
    const history = useHistory();
    const dispatch = useDispatch();
    const [error, setError] = useState({
        show: false,
        msg: ''
    });
    useEffect(() => {
        window.addEventListener('resize', () => setVersion(getVersionImage()));
        return () => {
            window.removeEventListener('resize', () => setVersion(getVersionImage()));
        }
    }  , []);

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
        const canal = 'Campaña Julio 2022';
        const dataForm = { ...values, canal };
        
        let {data} = await axios.post('broker', dataForm);

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

                    <img className="d-block w-100" src={images[version]} alt="brokersbanner" />
            </div>
            <div className="brokers-container container-fluid">
            <div style={{ backgroundColor:'var(--black04)', margin:'0',}}>
                <Info/>
            </div>
            <Cards />
            <AlliesLanding estado={version}/>
            <Comunity hubspotInfo={hubspotInfo} estado={version}/>
            {/* <Testimonio /> */}
            <div className="title-dp fz42 fw500 mb-1 text-center mt-2" style={{color:'#213970'}}>
                <span style={{color:'#EF4E5B'}}> conviértete </span> en broker digital dp
            </div>
            <div className="metropolisReg fz21 text-center blackBlue">
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
             </div>

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