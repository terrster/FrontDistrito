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
const getSize = () => {
	const currentSize = document.getElementsByTagName('body')[0].clientWidth;
	return currentSize < 775 ? 1 : 0;
};

const Landing = () => {

    const [version, setVersion] = useState(getSize());

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

    useEffect(() => {
        window.addEventListener('resize', () => setVersion(getSize()));
        return () => {
            window.removeEventListener('resize', () => setVersion(getSize()));
        }
    }  , []);


    return (
        <div className="casa">
            <Header estado={version} buttonText={"Solicitar ahora"} />
            <LandSimulator estado={version}/>
            <div className="container-fluid">     
                <CreditOption estado={version}/>
                <Products estado={version}/>
                <div className='container-fluid'>
                    <HowWorks estado={version} />
                </div>
                <Video />
            </div>
                <AlliesLanding estado={version}/>
            <div className="container-fluid" style={{padding: '0'}}>  
                {/* <AboutUs />       */}
                <Comunity hubspotInfo={hubspotInfo} origen={'landing'} estado={version}/>
                <Contact estado= {version}/> 
            </div>
        </div>
    );
}

export default Landing;