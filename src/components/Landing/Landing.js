import React, { useCallback, useState, useEffect } from 'react';
import io from 'socket.io-client';
import Header from './Header/Header';
import LandSimulator from '../Simulator/LandSimulator';
// import AboutUs from './AboutUs/AboutUs';
import Video from './Video/Video';
import HowWorks from './HowWorks/HowWorks';
import Contact from './Contact/Contact';
import Axios from "../../utils/axios";
import Slider from '../BrokersLanding/Aliados/Allies';
import Comunity from '../BrokersLanding/Comunity/Comunity';
import CreditOption from "./CreditOption/CreditOption";
import Products from "./Products/Products";
import AlliesLanding from "./AlliesLanding/AlliesLanding";

const Landing = () => {

    useEffect(() => {
        const addVisit = async () => {
            await Axios.post('/counter/visit');
        }

        addVisit();
    }, []);

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


    return (
        <div className="">
            <Header title={"¿Necesitas financiamiento?"} text={"Recibe las mejores ofertas de crédito "} highlighted={"¡En menos de 24 horas!"} buttonText={"Solicitar ahora"} />
            <LandSimulator />
            <div className="container-fluid">     
                <CreditOption />
                <Products/>
                <HowWorks />
                <Video />
            </div>
                <AlliesLanding />
            <div className="container-fluid">  
                {/* <AboutUs />       */}
                <Comunity hubspotInfo={hubspotInfo} origen={'landing'}/>
                <Contact /> 
            </div>
        </div>
    );
}

export default Landing;